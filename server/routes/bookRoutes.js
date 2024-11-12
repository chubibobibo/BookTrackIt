import express from "express";
import { addBook } from "../controllers/bookControllers.js";
import { newBookValidation } from "../middleware/inputValidation.js";

import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/newBook", upload.single("photoUrl"), newBookValidation, addBook);

export default router;
