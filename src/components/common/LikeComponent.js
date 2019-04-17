import PropTypes from "prop-types";
import React from "react";
import likeIcon from "../../assets/img/like-icon.svg";
import dislikeIcon from "../../assets/img/dislike-icon.svg";

const LikeComponent = ({ onClick, likeCount }) => (
  <div>
    <img
      onClick={onClick}
      onKeyUp={() => {}}
      className="share-icon"
      src={likeIcon}
      alt="logo"
    />{" "}
    <p> {likeCount}</p>
  </div>
);

LikeComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired
};
export default LikeComponent;
