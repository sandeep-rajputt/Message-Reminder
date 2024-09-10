import jwt from "jsonwebtoken";

const generateResetPasswordToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default generateResetPasswordToken;
