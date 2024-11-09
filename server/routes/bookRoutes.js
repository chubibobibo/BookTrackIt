import express from "express";
import { addBook } from "../controllers/bookControllers.js";
const router = express.Router();

router.post("/newBook", addBook);

export default router;
