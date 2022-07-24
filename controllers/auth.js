import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";

export const register = async (req, res, next) => {
  try {
    if (!req.body.username) {
      return next(createError(400, "Invalid username"));
    }
    if (!req.body.email || !isEmail(req.body.email)) {
      return next(createError(400, "Invalid email"));
    }

    if (!req.body.password) {
      return next(createError(400, "Invalid password"));
    } else if (!isStrongPassword(req.body.password)) {
      return next(
        createError(
          400,
          "Invalid password: Min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
        )
      );
    } else {
      const checkUsername = await User.findOne({ username: req.body.username });
      const checkEmail = await User.findOne({ email: req.body.email });
      if (checkUsername) {
        return next(createError(400, "Username taken"));
      } else if (checkEmail) {
        return next(createError(400, "Email taken"));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        await newUser.save();
        const { username } = newUser;
        res.status(200).json({ username });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    if (!req.body.email || !isEmail(req.body.email)) {
      return next(createError(400, "Invalid email"));
    }

    if (!req.body.password) {
      return next(createError(400, "Invalid password"));
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { username } = user._doc;
    res
      .cookie("access_token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ username });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res
    .cookie("access_token", "", { maxAge: 1 })
    .status(200)
    .send("User logged out");
};
