import { error } from "qrcode-terminal";

/**
 * Validates the mobile number
 * - Minimum length of 10 characters
 * - Maximum length of 15 characters
 * - Starts with + or a digit
 * - Contains only numeric characters after the initial +
 *
 * @param {string} mobileNumber - The mobile number to validate.
 * @returns {object} - Returns error message if the mobile number is invalid, otherwise returns error: false.
 */
export default function validateMobileNumber(mobileNumber) {
  if (typeof mobileNumber !== "string") {
    return {
      error: true,
      message: "Invalid mobile number format: " + mobileNumber,
    };
  }

  // Check if the number starts with + or a digit
  if (!/^\+?\d/.test(mobileNumber)) {
    return {
      error: true,
      message: "Invalid mobile number format: " + mobileNumber,
    };
  }

  // Remove the leading + if present
  const numberWithoutPlus = mobileNumber.startsWith("+")
    ? mobileNumber.slice(1)
    : mobileNumber;

  // Validate length
  if (numberWithoutPlus.length < 10 || numberWithoutPlus.length > 20) {
    return {
      error: true,
      message: "Invalid mobile number length: " + mobileNumber,
    };
  }

  // Check if all characters are digits
  const mobileNumberRegex = /^\d+$/;
  if (!mobileNumberRegex.test(numberWithoutPlus)) {
    return {
      error: true,
      message:
        "Mobile number should contain only digits after the initial +: " +
        mobileNumber,
    };
  }

  return { error: false };
}
