import React from "react";
import PropTypes from "prop-types";

const SocialButton = props => {
  const { className, iconName, alt, onClick } = props;
  return (
    <div className={`icon ${className}`} onClick={onClick}>
      <img
        src={require(`../../../assets/icons/${iconName}-icon.svg`)}
        alt={alt}
      />
    </div>
  );
};

SocialButton.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
SocialButton.defaultProps = {
  className: ""
};
export default SocialButton;
