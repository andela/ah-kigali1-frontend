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
}
