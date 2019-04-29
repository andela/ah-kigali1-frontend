import PropTypes from "prop-types";
import React from "react";

const BookmarkComponent = ({ onClick, icon, disabled }) => (
  <img
    onClick={onClick}
    onKeyUp={() => {}}
    className="share-icon"
    src={icon}
    alt="logo"
    disabled={disabled}
  />
);

BookmarkComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default BookmarkComponent;
