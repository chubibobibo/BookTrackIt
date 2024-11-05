import { body, validationResult } from "express-validator";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { UserModel } from "../models/UserSchema.js";
import { StatusCodes } from "http-status-codes";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

/** VALIDATE REGISTER INPUT */
export const registerValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username should be more than 3 characters")
    .custom(async (username) => {
      const foundName = await UserModel.findOne({ username: username });
      if (foundName) {
        throw new ExpressError("username already used");
      }
    }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Last name should be more than 3 characters"),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("First name should be more than 3 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be more than 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError(
          "Email is already in use",
          StatusCodes.BAD_REQUEST
        );
      }
    }),
]);

/** VALIDATE LOGIN INPUT */
export const loginValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username should be more than 3 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be more than 8 characters"),
]);

/** VALIDATE UPDATE PROFILE */
export const updateProfileValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username should be more than 3 characters")
    .custom(async (username) => {
      const foundName = await UserModel.findOne({ username: username });
      if (foundName) {
        throw new ExpressError("username already used");
      }
    }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Last name should be more than 3 characters"),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("First name should be more than 3 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be more than 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError(
          "Email is already in use",
          StatusCodes.BAD_REQUEST
        );
      }
    }),
]);
