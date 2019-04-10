import React from "react";
import PropTypes from "prop-types";
const ButtonIcon = props => {
  return (
    <div className={`icon ${props.className}`} onClick={props.onClick}>
      <img
        src={require(`../../../assets/icons/${props.name}-icon.svg`)}
        alt={props.alt}
      />
    </div>
  );
};

ButtonIcon.prototype = {
  className: PropTypes.string,
  name: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func
};
export default ButtonIcon;
