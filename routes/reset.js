import express from "express";
import { request, change, update } from "../controllers/reset.js";
const router = express.Router();
import multer from "multer";
import { storage } from "../cloudinary/index.js";

const upload = multer({ storage });

router.post("/request", request);
router.post("/change", change);
router.post("/update", upload.single("image"), update);

export default router;
