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
