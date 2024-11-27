import "express-async-errors";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { BookModel } from "../models/BookSchema.js";
import cron from "node-cron"; //scheduler
import sgMail from "@sendgrid/mail";

import { notifMessage } from "../utils/notifMsg.js";

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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { search, status } = req.query;
  const queryObj = {
    owner: req.user._id,
  };

  /** @queryObj default search if search query doesn't exist */
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

  /** @dateChecker function to implement statuses for books depending on the dates*/
  const dateChecker = async () => {
    /** Implementing due dates */
    /** @presentDate contains present date that we will be adding on */
    /** @dueDate present date + 2 days */
    /** @dueBooks finding all books that are about to be returned */
    const presentDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(presentDate.getDate() + 2); //sets the new value of dueDate to be 2 days before the present date.

    /** @dueBooks finds all books having presentDate 2 days before dateToReturn */
    /** populate the owner property so that we can obtain the email of the owner */
    const dueBooks = await BookModel.find({
      owner: req.user._id,
      //look for books that dateToReturn is greater than the presentDate and less than/equal to dueDate(2 days before the )
      dateToReturn: { $lt: dueDate, $gte: presentDate },
    }).populate("owner");

    if (dueBooks) {
      for (const allDueBooks of dueBooks) {
        // console.log(allDueBooks.owner);
        const msg = notifMessage(allDueBooks.owner.email); //function that uses email of books with due soon status to send notifs
        //checks if status is not "due soon" to prevent sending  of email every time dueBooks are found
        if (allDueBooks.status !== "due soon") {
          allDueBooks.status = "due soon";
          await allDueBooks.save();
          sgMail.send(msg).then(
            () => {
              console.log("hello");
            },
            (error) => {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
        }
      }
    }

    /** Implementing present date exceeding date to return*/
    const expiredDates = await BookModel.find({
      owner: req.user._id,
      dateToReturn: { $lte: presentDate },
    });

    // console.log(expiredDates);

    /** check as well books that status is not "returned" */
    if (expiredDates) {
      for (const allExpiredDates of expiredDates) {
        if (allExpiredDates.status !== "returned") {
          allExpiredDates.status = "did not return";
          await allExpiredDates.save();
        }
      }
    }
  };

  cron.schedule(" 0 0 * * * ", () => {
    console.log("Running at midnight");
    dateChecker();
  });

  dateChecker();

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
