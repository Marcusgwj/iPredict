import express from "express";
import { getPicture } from "../controllers/picture.js";

const router = express.Router();

router.post("/getPicture", getPicture);

export default router;
