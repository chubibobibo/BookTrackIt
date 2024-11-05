import express from "express";
import {
  login,
  register,
  // logout,
  getLoggedUser,
  updateUser,
} from "../controllers/authController.js";

import passport from "passport";
import { logout, isLoggedIn } from "../middleware/authMiddleware.js";

import {
  loginValidation,
  registerValidation,
  updateProfileValidation,
} from "../middleware/inputValidation.js";

const router = express.Router();

/** GET LOGGED USER */
router.get("/getLoggedUser", getLoggedUser);

/** LOGGING OUT */
/** @logout middleware to logout */
router.post("/logout", logout);

router.post("/register", registerValidation, register);

/** @user authenticated user object (successful authentication) */
/** @info error messages encountered */
router.post("/login", loginValidation, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    /** auth fails */
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Username or password incorrect",
      });
    }
    /** auth succeeds */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return login(req, res);
    });
  })(req, res, next); //invokes the passport.authenticate immediately;
});

/**UPDATE USER */
router.patch("/updateProfile", updateProfileValidation, isLoggedIn, updateUser);

export default router;
