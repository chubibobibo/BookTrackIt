import "express-async-errors";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { BookModel } from "../models/BookSchema.js";

export const addBook = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }

  const newBook = await BookModel.create(req.body);
  if (!newBook) {
    throw new ExpressError("Cannot create a new book", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ message: "New book created", newBook });
};
