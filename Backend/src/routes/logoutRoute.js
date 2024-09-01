import express from "express";
const router = express.Router();
import authenticateToken from "../utils/authenticateToken.js";

router.get("/", authenticateToken, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ error: false, message: "Logged out successfully" });
});

export default router;
