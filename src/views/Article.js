import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LikeComponent from "../components/common/LikeComponent";
import likeIcon from "../assets/img/like-icon.svg";
import dislikeIcon from "../assets/img/dislike-icon.svg";
import { handleDislike, handleLike } from "../redux/actions/likeActions";

export class Article extends Component {
  render() {
    const { like, dislike, likeCount, isLiked } = this.props;
    let likeEvent, dislikeEvent;

    if (!isLiked) {
      likeEvent = like;
      dislikeEvent = () => {};
    } else {
      likeEvent = () => {};
      dislikeEvent = dislike;
    }
    return (
      <div>
        <LikeComponent onClick={likeEvent} icon={likeIcon} />
        <LikeComponent onClick={dislikeEvent} icon={dislikeIcon} />
        <p>{likeCount}</p>
      </div>
    );
  }
}

const mapStateToProps = state => state.like;

const mapDispatchToProps = dispatch => ({
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
  like: PropTypes.func,
  dislike: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired
};

Article.defaultProps = {
  like: () => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
