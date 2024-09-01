import express from "express";
const router = express.Router();
import UserData from "../models/userData.model.js";
import validatePassword from "../utils/validatePassword.js";
import validateEmail from "../utils/validateEmail.js";
import validateMobileNumber from "../utils/validateMobileNumber.js";
import OtpData from "../models/otpData.model.js";
import sendOtpNumber from "../utils/sendOtpNumber.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;
  let { number } = req.body;
  number = number.toString();

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: true,
      message:
        "Password must be 8 characters long and contain at least one digit",
    });
  } else if (!name) {
    return res.status(400).json({ error: true, message: "please enter name" });
  }
  const validNumber = validateMobileNumber(number);
  if (validNumber.error) {
    return res.status(400).json({ error: true, message: validNumber.message });
  }

  number = `${number.toString().slice(1, number.length)}@c.us`;

  if (email) {
    if (!validateEmail(email)) {
      return res.status(400).json({ error: true, message: "Invalid email" });
    }
  }

  const isUserExists = await UserData.findOne({ number: number });
  if (isUserExists) {
    return res
      .status(400)
      .json({ error: true, message: "This number is already registered" });
  }

  try {
    const isUserOtpExist = await OtpData.findOne({ number });
    if (isUserOtpExist) {
      await OtpData.deleteOne({ number });
    }

    const otp = await sendOtpNumber(number, 6);
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    await OtpData.create({ number: number, otp: hashedOTP });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
});

export default router;
