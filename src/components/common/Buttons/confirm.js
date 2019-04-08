import React from "react";
import PropTypes from "prop-types";

const Confirm = ({ title, ...props }) => (
  <div>
    <button type="button" className="btn" {...props}>
      {title}
    </button>
  </div>
);

Confirm.propTypes = {
  title: PropTypes.string.isRequired
};
export default Confirm;
