import { isEmpty, capitalize } from "./helperFunctions";
/**
 * @class Validator
 */

export default class Validator {
  /**
   * @description validate form input
   * @param {object} data - form input data
   * @returns {object} return error object
   */
  static formData(data) {
    const errors = {};
    Object.keys(data).forEach(field => {
      if (isEmpty(data[field])) {
        errors[field] = `${capitalize(field)} is required`;
      }
    });
    return errors;
  }

  static isMatch(field, password, confirmPassword) {
    const errors = {};
    if (password !== confirmPassword) {
      errors.message = `Your ${field}s  do not match!`;
    }
    return errors;
  }

  static newArticleValidation(data) {
    let error;
    const { title, body, description } = data;
    if (!title || title.length < 10) {
      error = "Title should be more than 10 characters long";
      return error;
    }
    if (!description || description.length < 10) {
      error = "Description should be more than 10 characters long";
      return error;
    }
    if (body.length < 100) {
      error = "Body should be more than 100 words";
      return error;
    }
  }

  static reportDescription(description) {
    if (
      (description && (description.length < 10 || description.length > 254)) ||
      !description
    ) {
      return "Report should be more than 10 and less 255 characters long";
    }
    return false;
  }

  /**
   * @description checks if an email syntax is right or wrong
   * @param { String } email
   * @returns { Boolean } Boolean
   */

  static isEmailValid(email) {
    const emailRegex = /^([a-z_.!@#$%^&*0-9]{3,25})@([a-z]{3,20})\.([a-z]){2,7}(\.[a-z]{2,5})?$/i;
    return emailRegex.test(email);
  }

  /**
   * @description checks if a password syntax is right
   * @param {String} password to be tested
   * @returns {Boolean} returns true or false
   */
  static isPasswordValid(password) {
    const passwordRegex = /^([a-z0-9]).{8,}$/;

    return passwordRegex.test(password);
  }

  /**
   * @description checks if a username syntax is right
   * @param {String} name to be tested
   * @return {Boolean} returns true or false
   */
  static isUsernameValid(name) {
    const usernameRegex = /^([a-zA-Z0-9!@#$%^_&.*]){3,20}$/;
    return usernameRegex.test(name);
  }
}
