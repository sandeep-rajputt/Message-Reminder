import express from "express";
const router = express.Router();
import UserData from "../models/userData.model.js";
import validatePassword from "../utils/validatePassword.js";
import validateEmail from "../utils/validateEmail.js";
import validateMobileNumber from "../utils/validateMobileNumber.js";
import OtpData from "../models/otpData.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

router.post("/", async (req, res) => {
  const { name, password, email, otp } = req.body;
  let { number } = req.body;
  number = number.toString();

  if (!validatePassword(password)) {
    return res.status(400).json({ error: true, message: "Invalid password" });
  } else if (!name) {
    return res.status(400).json({ error: true, message: "Invalid name" });
  } else if (!validateMobileNumber(number)) {
    return res.status(400).json({ error: true, message: "Invalid number" });
  } else if (!otp) {
    return res.status(400).json({ error: true, message: "Invalid OTP" });
  }

  if (email) {
    if (!validateEmail(email)) {
      return res.status(400).json({ error: true, message: "Invalid email" });
    }
  }

  number = `${number.toString().slice(1, number.length)}@c.us`;

  const isUserExists = await UserData.findOne({ number: number });
  if (isUserExists) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  const isOtpExist = await OtpData.findOne({ number: number });
  if (!isOtpExist) {
    res.status(400).json({ error: false, message: "Invalid OTP" });
  } else {
    try {
      const isOtpValid = await bcrypt.compare(otp.toString(), isOtpExist.otp);
      if (!isOtpValid) {
        res.status(400).json({ error: false, message: "Invalid OTP" });
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
        const token = jsonwebtoken.sign(
          { number: number },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 30,
          sameSite: "strict",
        });
        console.log(token);
        res
          .status(200)
          .json({ error: false, message: "User registered successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: true, message: "Internal server error" });
      console.log({ error: "Failed to register user" + error.message });
    }
  }
});

export default router;
