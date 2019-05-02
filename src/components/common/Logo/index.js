import React from "react";
import PropTypes from "prop-types";
import logoImage from "../../../assets/img/quill-drawing-a-line.svg";

const Logo = ({ ...props }) => (
  <img src={logoImage} alt="logo" className="logo" {...props} />
);

Logo.propTypes = {
  className: PropTypes.string
};

Logo.defaultProps = {
  className: "logo"
};
export default Logo;
