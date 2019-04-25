import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LikeComponent from "../components/common/LikeComponent";
import likeIcon from "../assets/img/like-icon.svg";
import dislikeIcon from "../assets/img/dislike-icon.svg";
import likedIcon from "../assets/img/thumb-up-fill.svg";
import dislikedIcon from "../assets/img/thumb-down-outline.svg";
import { handleDislike, handleLike } from "../redux/actions/likeActions";

export class Article extends Component {
  render() {
    const { like, dislike, likeCount, isLiked } = this.props;
    let likeEvent, dislikeEvent, theLikeIcon, theDislikedIcon;
    // ask the PO how to simulate this event
    if (!isLiked) {
      likeEvent = like;
      dislikeEvent = () => {};
      theLikeIcon = likeIcon;
      theDislikedIcon = dislikedIcon;
    } else {
      theLikeIcon = likedIcon;
      likeEvent = () => {};
      dislikeEvent = dislike;
      theDislikedIcon = dislikeIcon;
    }
    return (
      <div>
        <LikeComponent onClick={likeEvent} icon={theLikeIcon} />
        <LikeComponent onClick={dislikeEvent} icon={theDislikedIcon} />
        <p>{likeCount}</p>
      </div>
    );
  }
}

export const mapStateToProps = state => state.like;

export const mapDispatchToProps = dispatch => ({
  like: () =>
    dispatch(
      handleLike("it-was-a-good-experience-to-have-the-chick-here-c3nws245b99")
    ),
  dislike: () =>
    dispatch(
      handleDislike(
        "it-was-a-good-experience-to-have-the-chick-here-c3nws245b99"
      )
    )
});

Article.propTypes = {
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
