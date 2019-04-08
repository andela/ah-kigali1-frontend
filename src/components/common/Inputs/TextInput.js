import React from "react";
import PropTypes from "prop-types";
const TextInput = props => (
  <input
    {...props}
    name={props.name}
    type={props.type}
    id={props.id}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

export default TextInput;

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
TextInput.defaultProps = {
  value: ""
};
