import express from "express";
import authenticateToken from "../utils/authenticateToken.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  res.status(200).json({ error: false, message: "User is authenticated" });
});

export default router;
