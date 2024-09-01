import express from "express";
const router = express.Router();
import authenticateToken from "../utils/authenticateToken.js";
import UserData from "../models/userData.model.js";

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await UserData.findOne({ number: req.user.number });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({
      error: false,
      message: "User found",
      userData: {
        name: user.name,
        number: user.number,
        email: user.email,
        messages: user.messages,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
});

export default router;
