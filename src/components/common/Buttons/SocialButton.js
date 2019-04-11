import React from "react";
import PropTypes from "prop-types";

const SocialButton = props => {
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

SocialButton.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
SocialButton.defaultProps = {
  className: ""
};
export default SocialButton;
