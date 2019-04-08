import React from "react";
import PropTypes from "prop-types";
const FormButton = props => {
  return (
    <input
      {...props}
      type="button"
      value={props.value}
      onClick={props.onClick}
    />
  );
};

FormButton.prototype = {
  value: PropTypes.string,
  onClick: PropTypes.func
};
FormButton.defaultProps = {
  value: "Submit"
};
export default FormButton;
