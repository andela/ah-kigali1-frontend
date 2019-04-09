import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ title }) => (
  <div className="error-msg">
    <i className="fa fa-times-circle" />
    {title}
  </div>
);

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired
};
export default ErrorMessage;
