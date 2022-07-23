import User from "../models/User.js";
import Token from "../models/Token.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createError } from "../utils/error.js";
import sendEmail from "../utils/email/sendEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import isEmail from "validator/lib/isEmail.js";

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
      `<div> <p>Hi ${user.username},</p> <p>You requested to reset your password.</p> <p> Please click the link below to reset your password</p> <a href=${link}>Reset Password</a> </div>`
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
      return next(createError(404, "Invalid or expired password reset token"));
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return next(createError(404, "Invalid or expired password reset token"));
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

export const update = async (req, res, next) => {
  try {
    const { currentUser, newUsername, email, password } = req.body;

    let user = await User.findOne({ username: currentUser });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    if (req.file) {
      user.photo = req.file.path;
      await user.save();
    }

    // Update email
    if (email != "undefined" && email != "") {
      let checkEmail = await User.findOne({ email });
      if (!checkEmail) {
        if (!isEmail(email)) {
          return next(createError(400, "Invalid email"));
        }
        await User.updateOne(
          { username: currentUser },
          { $set: { email: email } },
          {
            returnOriginal: false,
          }
        );
      } else {
        return next(createError(400, "Email taken"));
      }
    }

    // Update password
    if (password != "undefined" && password != "") {
      if (!isStrongPassword(password)) {
        return next(
          createError(
            400,
            "Invalid password: Min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
          )
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await User.updateOne(
        { username: currentUser },
        { $set: { password: hash } },
        {
          returnOriginal: false,
        }
      );
    }

    // Update username
    let updateUser = null;
    if (newUsername != "undefined" && newUsername != "") {
      let checkUser = await User.findOne({ username: newUsername });
      if (!checkUser) {
        updateUser = await User.findOneAndUpdate(
          { username: currentUser },
          { $set: { username: newUsername } },
          {
            returnOriginal: false,
          }
        );
      } else {
        return next(createError(400, "Username taken"));
      }
    }

    if (updateUser != null) {
      const { username } = updateUser._doc;
      return res.status(200).json({ username });
    } else {
      return res.status(200).json({ username: currentUser });
    }
  } catch (err) {
    next(err);
  }
};
