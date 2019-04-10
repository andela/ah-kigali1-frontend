import React from "react";
import PropTypes from "prop-types";

const BasicButton = props => {
  const { className, onClick, title } = props;
  return (
    <button
      type="button"
      className={`btn ${className}`}
      {...props}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

BasicButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};
BasicButton.defaultProps = {
  title: "",
  className: "btn"
};
export default BasicButton;
