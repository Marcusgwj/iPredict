import User from "../models/User.js";
import Portfolio from "../models/portfolio.js";
import { createError } from "../utils/error.js";

export const getStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "portfolio"
    );
    if (!user.portfolio) {
      res.status(200).json([]);
    } else {
      let keys = Array.from(user.portfolio.stocks.keys());
      res.status(200).json(keys);
    }
  } catch (err) {
    next(err);
  }
};

export const addStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "portfolio"
    );

    if (!user.portfolio) {
      const newPortfolio = new Portfolio({
        stocks: new Map(),
      });
      newPortfolio.stocks.set(req.body.stock, req.body.stock);
      await newPortfolio.save();
      user.portfolio = newPortfolio;
    } else {
      user.portfolio.stocks.set(req.body.stock, req.body.stock);
      await user.portfolio.save();
    }

    res.status(200).send("Added stock");
  } catch (err) {
    next(err);
  }
};

export const removeStocks = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id }).populate(
      "portfolio"
    );
    if (!user.portfolio) {
      return next(createError(400, "No stocks in portfolio"));
    }
    user.portfolio.stocks.delete(req.body.stock);
    await user.portfolio.save();
    await user.save();
    res.status(200).send("Removed stock");
  } catch (err) {
    next(err);
  }
};
