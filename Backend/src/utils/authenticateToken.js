import jsonwebtoken from "jsonwebtoken";
import ExpiredToken from "../models/expiredToken.model.js";

async function authenticateToken(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  const isExpired = await ExpiredToken.findOne({ token });
  if (isExpired) {
    return res
      .status(401)
      .json({ error: true, message: "Token has already been used" });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

export default authenticateToken;
