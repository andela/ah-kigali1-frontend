import React from "react";
import PropTypes from "prop-types";
const BasicButton = props => {
  return (
    <button
      type="button"
      className={`btn ${props.className}`}
      {...props}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

BasicButton.prototype = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};
BasicButton.defaultProps = {
  title: ""
};
export default BasicButton;
