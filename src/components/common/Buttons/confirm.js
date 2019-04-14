import React from "react";
import PropTypes from "prop-types";

const Confirm = ({ title, ...props }) => (
  <button type="submit" className="btn" {...props}>
    {title}
  </button>
);

Confirm.propTypes = {
  title: PropTypes.string.isRequired
};
export default Confirm;
