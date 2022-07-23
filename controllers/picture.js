import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const getPicture = async (req, res, next) => {
  try {
    if (!req.body.username) {
      return next(createError(400, "Invalid user"));
    } else {
      const user = await User.findOne({ username: req.body.username });
      if (!user.photo) {
        return next(createError(400, "No photo"));
      }

      return res.status(200).json(user.photo);
    }
  } catch (err) {
    next(err);
  }
};
