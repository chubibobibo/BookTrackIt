import express from "express";
import { register } from "../controllers/authController.js";

import { registerValidation } from "../middleware/inputValidation.js";

const router = express.Router();

router.post("/register", registerValidation, register);

export default router;
