import React from "react";
import PropTypes from "prop-types";

const ButtonIcon = props => {
  const { className, iconName, alt } = props;
  return (
    <div className={`icon ${className}`}>
      <img
        src={require(`../../../assets/icons/${iconName}-icon.svg`)}
        alt={alt}
      />
    </div>
  );
};

ButtonIcon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
ButtonIcon.defaultProps = {
  className: ""
};
export default ButtonIcon;
