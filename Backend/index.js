import express from "express";
import sendOtpNumber from "./src/utils/sendOtpNumber.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/router.js";
import client from "./src/messaging/client.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bot from "./src/telegrambot/bot.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
