import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import authRoute from "./routes/authRoute.js";

/** IMPORTS FOR SESSION AND PASSPORT */
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { UserModel } from "./models/UserSchema.js";

const app = express();

app.use(express.json()); // parses json data\

/** Database connection */
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB);
}

/** MONGO STORE FOR EXPRESS SESSIONS */
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_DB,
  secret: process.env.MONGO_SECRET,
  touchAfter: 24 * 60 * 60,
});

/** EXPRESS SESSIONS */
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    store,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.DEV_ENV === "production", //cookies are sent only in https requests
      expires: Date.now(1000 * 60 * 60 * 24 * 7),
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

/** Middleware to check if session and req.user is created */
app.use((req, res, next) => {
  console.log(req.user);
  console.log(req.session);
  next();
});

passport.use(UserModel.createStrategy()); //Using the strategy created with passport local mongoose in the UserSchema
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

/** Routes */
app.use("/api/auth/", authRoute);

/** middleware for not found errors and express errors */
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
