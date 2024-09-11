import jwt from "jsonwebtoken";
import ExpiredToken from "../models/expiredToken.model.js";

// Function to handle token expiration
const expireToken = async (token) => {
  try {
    // Decode the token without verifying
    const decoded = jwt.decode(token);

    if (decoded && decoded.exp) {
      const expirationTime = decoded.exp * 1000;
      const expirationDate = new Date(expirationTime);
      const expiredToken = new ExpiredToken({
        token: token,
        expiresAt: expirationDate,
      });

      await expiredToken.save();
      console.log("token expired");
    }
  } catch (error) {
    console.error("Error handling token expiration:", error);
  }
};

export default expireToken;
