// src/utils/validateEmailjs

/**
 * Validate the email
 *
 * @param {string} email - the email to validate
 * @returns {boolean} - Returns true if email is valid email
 */

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default validateEmail;
