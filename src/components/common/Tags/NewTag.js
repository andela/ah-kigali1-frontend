/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

const Tag = props => {
  const { title, onClick } = props;
  return (
    <span className="tag">
      {title} <i className="ico-times" onClick={onClick} />
    </span>
  );
};

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
export default Tag;
