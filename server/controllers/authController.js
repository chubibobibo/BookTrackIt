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

/** LOGIN */
export const login = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const foundUser = await UserModel.findOne({ username: req.body.username });
  if (!foundUser) {
    throw new ExpressError("User does not exist", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "User found", foundUser });
};

/** UPDATE USER */
export const updateUser = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("User is not logged in", StatusCodes.BAD_REQUEST);
  }
  const { username, lastName, firstName, email, password } = req.body;

  const foundUser = await UserModel.findById(req.user._id);

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user,
    {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    {
      new: true,
    }
  );
  /** setting a new password */
  if (password) {
    await foundUser.setPassword(password);
    await foundUser.save();
  }

  if (!updatedUser) {
    throw new ExpressError("Cannot update user", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User profile updated", updatedUser });
};

/** GET LOGGED USER */
export const getLoggedUser = async (req, res) => {
  if (!req.user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User is not logged in" });
    // throw new ExpressError("User not logged in", StatusCodes.NOT_FOUND);
  } else {
    const foundUser = await UserModel.findById(req.user._id);
    if (!foundUser) {
      throw new ExpressError("Cannot find user", StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ message: "Found user", foundUser });
  }
};
