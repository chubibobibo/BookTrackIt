import "express-async-errors";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { BookModel } from "../models/BookSchema.js";

import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const addBook = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  req.body.status = "currently borrowed";
  req.body.owner = req.user._id;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "BookTrackIt",
      quality: 60, //change quality of uploaded imgs
      format: "jpg", //converts images into jpg
    }); //using cloudinary upload api to obtain url of the photo uploaded

    await fs.unlink(req.file.path); //removes the photo in the public folder using the path of the req.file
    req.body.photoUrl = response.secure_url;
    req.body.photoId = response.public_id;
  }

  const newBook = await BookModel.create(req.body);
  if (!newBook) {
    throw new ExpressError("Cannot create a new book", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ message: "New book created", newBook });
};

/** GET ALL BOOKS */
export const getAllBooks = async (req, res) => {
  /** @queryObj default search if search query doesn't exist */
  const { search, status } = req.query;

  const queryObj = {
    owner: req.user._id,
  };

  /** only if a search query is sent in the url */
  /** if search, use the query obj to search in the bookTitle or bookAuthor fields with options 'i' to ignore letter case */
  if (search) {
    queryObj.$or = [
      {
        bookTitle: { $regex: search, $options: "i" },
      },
      { bookAuthor: { $regex: search, $options: "i" } },
      // { status: { $regex: search, $options: "i" } },
    ];
  }

  /** Check for the status query in the url. Create a new property in the queryObj and give ii the value of the status query value */
  if (status) {
    queryObj.status = status;
  }

  const allBooks = await BookModel.find(queryObj).populate("owner").sort({
    createdAt: -1,
  });
  if (!allBooks) {
    res.status(StatusCodes.OK).json({ message: "No books found" });
  }
  res.status(StatusCodes.OK).json({ message: "Books found", allBooks });
};

/** GET CURRENTLY BORROWED BOOKS */

export const getBorrowedBooks = async (req, res) => {
  const borrowedBooks = await BookModel.find({
    /** sorting the newest entry */
    status: "currently-borrowed",
  }).sort({ createdAt: -1 });

  if (!borrowedBooks) {
    res.status(StatusCodes.OK).json({ message: "No books found" });
  }
  res.status(StatusCodes.OK).json({ message: "Books found", borrowedBooks });
};

/** UPDATE BOOK STATUS */
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const updatedStatus = await BookModel.findByIdAndUpdate(id, {
    status: "returned",
  });
  if (!updatedStatus) {
    throw new ExpressError("Cannot update status", StatusCodes.BAD_REQUEST);
  }
  res.status(StatusCodes.OK).json({ message: "Status updated" });
};

/** GET RETURNED BOOKS */
export const getReturnedBooks = async (req, res) => {
  const borrowedBooks = await BookModel.find({
    status: "returned",
  }).sort({ createdAt: -1 });

  if (!borrowedBooks) {
    res.status(StatusCodes.OK).json({ message: "No books found" });
  }
  res.status(StatusCodes.OK).json({ message: "Books found", borrowedBooks });
};
