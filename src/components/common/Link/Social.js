import React from "react";
import PropTypes from "prop-types";

const ShareIcon = ({ href, image }) => (
  <button
    type="button"
    className="share-icon"
    href={href}
    onClick={() => window.open(href)}
  >
    <img className="share-icon" src={image} alt="logo" />
  </button>
);

ShareIcon.propTypes = {
  href: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ShareIcon;
