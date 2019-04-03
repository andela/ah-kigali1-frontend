import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  type,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  ...props
}) => (
  <input
    {...props}
    name={name}
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func
};

TextInput.defaultProps = {
  id: "",
  value: PropTypes.string,
  onKeyDown: PropTypes.func
};

TextInput.defaultProps = {
  id: "",
  value: PropTypes.string,
  onKeyDown: PropTypes.func
};

TextInput.defaultProps = {
  id: "",
  value: "",
  onKeyDown: () => "",
  onBlur: () => {}
};

export default TextInput;
