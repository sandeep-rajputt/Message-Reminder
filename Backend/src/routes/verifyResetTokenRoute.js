import express from "express";
const router = express.Router();
import jsonwebtoken from "jsonwebtoken";
import ExpiredToken from "../models/expiredToken.model.js";

// verify reset password token route
router.post("/", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: true, message: "Token is required" });
  }

  const isExpired = await ExpiredToken.findOne({ token });
  if (isExpired) {
    return res
      .status(403)
      .json({ error: true, message: "Token has already been used" });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: true, message: "Token expired" });
      }
      return res.status(403).json({ error: true, message: "Invalid token" });
    }

    return res.status(200).json({
      error: false,
      message: "Token is valid",
      userId: decoded.userid,
    });
  });
});

export default router;
