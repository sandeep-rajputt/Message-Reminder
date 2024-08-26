import express from "express";
const router = express.Router();
import UserData from "../models/userData.model.js";
import validatePassword from "../utils/validatePassword.js";
import validateEmail from "../utils/validateEmail.js";
import validateMobileNumber from "../utils/validateMobileNumber.js";
import OtpData from "../models/otpData.model.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  const { number, name, password, email, otp } = req.body;
  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Invalid password" });
  } else if (!name) {
    return res.status(400).json({ error: "Invalid name" });
  } else if (!validateMobileNumber(number)) {
    return res.status(400).json({ error: "Invalid number" });
  } else if (!otp) {
    return res.status(400).json({ error: "Invalid OTP" });
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

  const isOtpExist = await OtpData.findOne({ number: number });
  if (!isOtpExist) {
    res.status(400).json({ error: "Invalid OTP" });
  } else {
    try {
      const hashedOTP = await bcrypt.hash(otp, 10);
      const isOtpValid = bcrypt.compare(hashedOTP, isOtpExist.otp);
      if (!isOtpValid) {
        res.status(400).json({ error: "Invalid OTP" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserData.create({
          name: name,
          number: number.toString(),
          password: hashedPassword,
          email: email,
          messages: [],
        });
        await OtpData.deleteOne({ number: number });
        res.status(200).json({ message: "User registered successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to register user" + error.message });
    }
  }
});

export default router;
