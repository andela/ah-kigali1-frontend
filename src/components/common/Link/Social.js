import React from "react";
import PropTypes from "prop-types";

const ShareIcon = ({ href, image }) => (
  <a href={href} className="share-icon">
    <img className="share-icon" src={image} alt="logo" />
  </a>
);

ShareIcon.propTypes = {
  href: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ShareIcon;
