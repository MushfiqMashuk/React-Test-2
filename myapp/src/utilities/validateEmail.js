/**
 * This helper function accepts an Email address and returns true or false based on whether it
 * is a valid email or not.
 *
 * @param {string} email
 * @returns {boolean}
 */

function validateEmail(email) {
  const validRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (email.match(validRegex)) {
    return true;
  } else return false;
}

export default validateEmail;
