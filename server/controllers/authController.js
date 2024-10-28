import "express-async-errors";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../models/UserSchema.js";

/** REGISTER USER */
/** destructured req.body to obtain password separately and use it in @setPassword */
/** @isAdmin check if new user is first entry in the database */
export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const isAdmin = (await UserModel.countDocuments()) === 0;
  console.log(isAdmin);
  req.body.role = isAdmin ? "admin" : "user";
  const { username, firstName, lastName, email, password } = req.body;
  const newUser = await UserModel.create({
    username,
    firstName,
    lastName,
    email,
    role: req.body.role,
  });
  await newUser.setPassword(password);
  await newUser.save();
  if (!newUser) {
    throw new ExpressError("Cannot register user", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "New user is registered", newUser });
};
