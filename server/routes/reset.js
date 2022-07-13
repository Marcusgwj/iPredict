import express from "express";
import { request, change } from "../controllers/reset.js";
const router = express.Router();

router.post("/request", request);
router.post("/change", change);

export default router;
