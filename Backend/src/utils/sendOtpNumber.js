// src/utils/sendOtpNumber.js

/**
 * Send otp to number
 *
 * @param {string} number - The mobile number to send otp.
 * @returns {string} - Returns 6 digit otp if otp is sent successfully, otherwise false.
 */

import client from "../messaging/client.js";

export default async function sendOtpNumber(number, length = 6) {
  if (typeof number !== "string") {
    return "Invalid number format:", number;
  } else if (number[0] !== "+") {
    return "Invalid number format:", number;
  }

  const otp = Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))
  );
  const whatsappNumber = `${number.slice(1, number.length)}@c.us`;

  try {
    await client.sendMessage(whatsappNumber, `Your OTP is: ${otp}`);
    return otp;
  } catch (error) {
    return "Failed to send OTP: ", error;
  }
}
