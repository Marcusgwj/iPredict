import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import watchlistRoute from "./routes/watchlist.js";
import resetRoute from "./routes/reset.js";
import pictureRoute from "./routes/picture.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/watchlist", watchlistRoute);
app.use("/api/reset", resetRoute);
app.use("/api/picture", pictureRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  connect();
  console.log("Connected to backend.");
});
