import mongoose from "mongoose";

import { status } from "../utils/status.js";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },

    bookAuthor: {
      type: String,
      required: true,
      default: "No author defined",
    },

    borrowedFrom: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },

    dateBorrowed: {
      type: Date,
      required: true,
    },

    dateToReturn: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(status),
      // required: true,
    },

    photoUrl: {
      type: String,
    },

    photoId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model("BookModel", BookSchema);
