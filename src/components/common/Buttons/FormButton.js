import React from "react";
import PropTypes from "prop-types";
const FormButton = props => {
  return (
    <input
      {...props}
      type="button"
      value={props.value}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
};

FormButton.prototype = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
FormButton.defaultProps = {
  value: "Submit",
  disabled: false
};
export default FormButton;
