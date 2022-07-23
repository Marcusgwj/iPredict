import express from "express";
import {
  getStocks,
  addStocks,
  removeStocks,
} from "../controllers/watchlist.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/getStocks", verifyUser, getStocks);
router.post("/addStocks", verifyUser, addStocks);
router.post("/removeStocks", verifyUser, removeStocks);

export default router;
