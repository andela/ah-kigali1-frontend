import React from "react";
import PropTypes from "prop-types";

const FormButton = props => {
  const { value, onClick, disabled } = props;
  return (
    <input
      {...props}
      type="button"
      value={value}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

FormButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
FormButton.defaultProps = {
  value: "Submit",
  disabled: false
};
export default FormButton;
