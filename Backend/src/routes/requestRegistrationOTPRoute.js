import express from "express";
const router = express.Router();
import UserData from "../models/userData.model.js";
import validatePassword from "../utils/validatePassword.js";
import validateEmail from "../utils/validateEmail.js";
import validateMobileNumber from "../utils/validateMobileNumber.js";
import OtpData from "../models/otpData.model.js";
import sendOtpNumber from "../utils/sendOtpNumber.js";
import convertMilliseconds from "../utils/convertMilliseconds.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  const { number, name, password, email } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Invalid password" });
  } else if (!name) {
    return res.status(400).json({ error: "Invalid name" });
  }
  const validNumber = validateMobileNumber(number);
  if (validNumber.error) {
    return res.status(400).json({ error: validNumber.error });
  }

  if (email) {
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
  }

  const isUserExists = await UserData.findOne({ number: number });
  if (isUserExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const isUserOtpExist = await OtpData.findOne({ number });

    if (isUserOtpExist) {
      const currentTime = Date.now();
      const otpCreatedTime = isUserOtpExist.createdAt.getTime();
      const timeRemaining = 180000 - (currentTime - otpCreatedTime);

      if (timeRemaining > 0) {
        const expirationDate = new Date(currentTime + timeRemaining);
        const timeleft = convertMilliseconds(timeRemaining);
        return res.status(400).json({
          error: `Please request OTP again after ${timeleft.minutes} minutes ${timeleft.seconds} seconds`,
        });
      }
      await OtpData.deleteOne({ number });
    }

    const otp = await sendOtpNumber(number, 6);
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    await OtpData.create({ number: number, otp: hashedOTP });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

export default router;
