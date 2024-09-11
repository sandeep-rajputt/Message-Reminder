import jwt from "jsonwebtoken";

const generateResetPasswordToken = (userid) => {
  return jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateResetPasswordToken;
