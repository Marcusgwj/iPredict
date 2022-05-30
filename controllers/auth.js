import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
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
      res.status(200).send("User has been created.");
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { username } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username });
  } catch (err) {
    next(err);
  }
};
