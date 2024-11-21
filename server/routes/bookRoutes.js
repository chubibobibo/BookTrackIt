import express from "express";
import {
  addBook,
  getAllBooks,
  updateStatus,
} from "../controllers/bookControllers.js";
import { newBookValidation } from "../middleware/inputValidation.js";
import { getBorrowedBooks } from "../controllers/bookControllers.js";

import upload from "../middleware/multerMiddleware.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allBooks", isLoggedIn, getAllBooks);
router.get("/borrowedBooks", isLoggedIn, getBorrowedBooks);
// router.get("/returnedBooks", isLoggedIn, returnedBooks);
router.post(
  "/newBook",
  upload.single("photoUrl"),
  isLoggedIn,
  newBookValidation,
  addBook
);
router.patch("/updateStatus/:id", isLoggedIn, updateStatus);

export default router;
