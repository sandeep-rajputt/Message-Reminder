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
  }

  const otp = Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))
  );

  try {
    await client.sendMessage(number, `Your OTP is: ${otp}`);
    return otp;
  } catch (error) {
    return "Failed to send OTP: ", error;
  }
}
