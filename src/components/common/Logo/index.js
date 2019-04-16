import React from "react";
import PropTypes from "prop-types";

const Logo = ({ className, ...props }) => (
  <img
    src={require("../../../assets/img/quill-drawing-a-line.svg")}
    alt="logo"
    className="logo"
    {...props}
  />
);

Logo.propTypes = {
  className: PropTypes.string
};

Logo.defaultProps = {
  className: "logo"
};
export default Logo;
