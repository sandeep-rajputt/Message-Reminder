// src/utils/validatePassword.js

/**
 * Validates the password
 * - Minimum length of 8 characters
 * - Contains at least one numeric digit
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

export default validatePassword;
