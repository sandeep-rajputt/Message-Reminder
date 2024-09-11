import express from "express";
const router = express.Router();
import authenticateToken from "../utils/authenticateToken.js";
import expireToken from "../utils/expireToken.js";

router.get("/", authenticateToken, async (req, res) => {
  const { token } = req.cookies;
  await expireToken(token);
  res.clearCookie("token");
  res.status(200).json({ error: false, message: "Logged out successfully" });
});

export default router;
