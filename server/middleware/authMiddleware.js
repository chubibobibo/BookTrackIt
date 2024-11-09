import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../ExpressError/ExpressError.js";

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(StatusCodes.OK).json({ message: "User is logged out" });
  });
};

export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  } else {
    next();
  }
};
