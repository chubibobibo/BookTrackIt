import { StatusCodes } from "http-status-codes";

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(StatusCodes.OK).json({ message: "User is logged out" });
  });
};
