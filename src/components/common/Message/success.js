import React from "react";
import PropTypes from "prop-types";

const SuccessMessage = ({ title }) => (
  <div className="success-msg">
    <i className="fa fa-check" />
    {title}
  </div>
);
SuccessMessage.propTypes = {
  title: PropTypes.string.isRequired
};

export default SuccessMessage;
