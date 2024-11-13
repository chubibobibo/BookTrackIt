import express from "express";
import { addBook } from "../controllers/bookControllers.js";
import { newBookValidation } from "../middleware/inputValidation.js";
import { getBorrowedBooks } from "../controllers/bookControllers.js";

import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/borrowedBooks", getBorrowedBooks);
router.post("/newBook", upload.single("photoUrl"), newBookValidation, addBook);

export default router;
