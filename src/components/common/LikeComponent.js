import PropTypes from "prop-types";
import React from "react";

const LikeComponent = ({ onClick, icon }) => (
  <div>
    <img
      onClick={onClick}
      onKeyUp={() => {}}
      className="share-icon"
      src={icon}
      alt="logo"
    />{" "}
  </div>
);

LikeComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};
export default LikeComponent;
