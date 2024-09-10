import express from "express";
const router = express.Router();
import UserData from "../models/userData.model.js";
import client from "../messaging/client.js";
import generateResetPasswordToken from "../utils/generateResetPasswordToken.js";

router.post("/", async (req, res) => {
  let { number } = req.body;
  number = number.toString();
  number = `${number.toString().slice(1, number.length)}@c.us`;
  if (!number) {
    return res.status(400).json({ error: true, message: "Number is required" });
  }
  const user = await UserData.findOne({ number: number });
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }
  try {
    const resetPasswordToken = generateResetPasswordToken(user._id);
    const message = `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`;
    await client.sendMessage(user.number, "Your reset password link is:");
    await client.sendMessage(user.number, message);
    res.status(200).json({ error: false, message: "Reset password link sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

export default router;
