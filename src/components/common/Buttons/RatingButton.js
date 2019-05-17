/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import ratingIcon from "../../../assets/img/star.svg";

const Rate = ({ onClick, onMouseOver }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <img
    className="share-icon"
    src={ratingIcon}
    alt="logo"
    onClick={onClick}
    onMouseOver={onMouseOver}
  />
);

Rate.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired
};
export default Rate;
