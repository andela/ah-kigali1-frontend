import React from "react";
import PropTypes from "prop-types";

const AuthErrorMessage = ({ message }) => (
  <div className="auth-errors">
    <p className="danger">{message}</p>
    <br />
  </div>
);

AuthErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};
export default AuthErrorMessage;
