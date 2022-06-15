import User from "../models/User.js";
import Watchlist from "../models/watchlist.js";
import { createError } from "../utils/error.js";

export const getStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "watchlist"
    );
    if (!user.watchlist) {
      res.status(200).json([]);
    } else {
      res.status(200).json(user.watchlist.stocks);
    }
  } catch (err) {
    next(err);
  }
};

export const addStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "watchlist"
    );

    if (!user.watchlist) {
      const newWatchlist = new Watchlist({
        stocks: [],
      });
      await newWatchlist.save();
      user.watchlist = newWatchlist;
    }
    user.watchlist.stocks.push(req.body.stock);
    await user.watchlist.save();
    await user.save();
    res.status(200).send("Added stock");
  } catch (err) {
    next(err);
  }
};

export const removeStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "watchlist"
    );
    if (!user.watchlist) {
      return next(createError(400, "No stocks in portfolio"));
    }
    user.watchlist.stocks = user.watchlist.stocks.filter(
      (stock) => stock !== req.body.stock
    );
    await user.watchlist.save();
    await user.save();
    res.status(200).send("Removed stock");
  } catch (err) {
    next(err);
  }
};
