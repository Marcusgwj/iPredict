import User from "../models/User.js";
import Token from "../models/Token.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createError } from "../utils/error.js";
import sendEmail from "../utils/email/sendEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";

export const request = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
    let resetToken = crypto.randomBytes(32).toString("hex");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(resetToken, salt);

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
    const link = `${process.env.CLIENT_URL}/passwordReset/${resetToken}/${user._id}`;
    await sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.username,
        link: link,
      },
      `<div> <p>Hi ${user.username},</p> <p>You requested to reset your password.</p> <p> Please click the link below to reset your password</p> <a href='http://${link}'>Reset Password</a> </div>`
    );
    return res.status(200).send(link);
  } catch (err) {
    next(err);
  }
};

export const change = async (req, res, next) => {
  try {
    const { userId, token, password } = req.body;

    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    if (!isStrongPassword(req.body.password)) {
      return next(
        createError(
          400,
          "Invalid password: Min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
        )
      );
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await User.updateOne({ _id: userId }, { $set: { password: hash } });
    const user = await User.findById({ _id: userId });
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      `<div> <p>Hi ${user.username},</p> <p>Your password has been changed successfully</p></div>`
    );
    await passwordResetToken.deleteOne();
    return res.status(200).send("Success");
  } catch (err) {
    next(err);
  }
};
