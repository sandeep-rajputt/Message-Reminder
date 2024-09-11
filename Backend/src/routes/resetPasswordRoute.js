import express from "express";
const router = express.Router();
import jsonwebtoken from "jsonwebtoken";
import UserData from "../models/userData.model.js";
import bcrypt from "bcrypt";
import expireToken from "../utils/expireToken.js";
import ExpiredToken from "../models/expiredToken.model.js";

router.post("/", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Token and new password are required" });
  }

  try {
    const isExpired = await ExpiredToken.findOne({ token });
    if (isExpired) {
      return res
        .status(403)
        .json({ error: true, message: "Token has already been used" });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userid;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const user = await UserData.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    await expireToken(token);
    res
      .status(200)
      .json({ error: false, message: "Password updated successfully" });
  } catch (err) {
    return res.status(401).json({ error: true, message: "Token expired" });
  }
});

export default router;
