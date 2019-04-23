import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LikeComponent from "../components/common/LikeComponent";
import likeIcon from "../assets/img/like-icon.svg";
import dislikeIcon from "../assets/img/dislike-icon.svg";
import { handleDislike, handleLike } from "../redux/actions/likeActions";

export class Article extends Component {
  render() {
    const { like, dislike, likeCount } = this.props;
    return (
      <div>
        <LikeComponent onClick={like} icon={likeIcon} />
        <LikeComponent onClick={dislike} icon={dislikeIcon} />
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
  dislike: () => dispatch(handleDislike())
});

Article.propTypes = {
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
