// src/utils/validatePassword.js

/**
 * Validates the password
 * - Minimum length of 8 characters
 * - Contains at least one numeric digit
 * - Contains at least one lowercase letter
 * - Contains at least one uppercase letter
 * - Allow special character
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gm;
  return passwordRegex.test(password);
}

export default validatePassword;
