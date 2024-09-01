import express from "express";
import validateMobileNumber from "../utils/validateMobileNumber.js";
import UserData from "../models/userData.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// login route
router.post("/", async (req, res) => {
  const { password } = req.body;
  let { number } = req.body;
  number = number.toString();

  if (!validateMobileNumber) {
    return res.status(400).json({ error: true, message: "Invalid number" });
  } else if (!password) {
    return res.status(400).json({
      error: true,
      message:
        "Password must be 8 characters long and contain at least one digit",
    });
  }

  number = `${number.toString().slice(1, number.length)}@c.us`;

  const user = await UserData.findOne({ number: number });
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: "Invalid password" });
    }
    const token = jsonwebtoken.sign(
      { number: user.number },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    console.log("send response");
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: "strict",
      })
      .json({ error: false, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

export default router;
