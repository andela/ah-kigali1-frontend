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
}
