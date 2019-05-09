import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoImg from "../../../assets/img/no-thumbnail.png";
import NoAvatar from "../../../assets/img/user.png";
import LikeIcon from "../../../assets/img/like-icon.svg";
import DisLikeIcon from "../../../assets/img/dislike-icon.svg";
import CommentIcon from "../../../assets/img/comment-icon.svg";
import BookmarkIcon from "../../../assets/img/bookmark-icons.svg";

export const AnimatedCard = ({
  title,
  likes,
  comments,
  description,
  author,
  readTime,
  createdAt,
  slug
}) => (
  <div className="blog-card">
    <div className="meta" data-test="thumbnail">
      <div
        className="article-thumbnail"
        style={{
          backgroundImage: `url(${NoImg})`
        }}
      />
    </div>
    <div className="card-content">
      <div className="info" data-test="author-info">
        <img
          src={author.image || NoAvatar}
          alt="user"
          className="user-profile-img"
        />
        <div className="more-info">
          <h3 className="username">{author.firstName || author.username}</h3>
          <span>
            {createdAt} {readTime} min read
          </span>
        </div>
      </div>
      <div className="card-title" data-test="article-details">
        <h2>{title}</h2>
      </div>
      <p className="card-text">
        {description}......
        <Link to={`/articles/${slug}`} className="read-more">
          Read more
        </Link>
      </p>
      <div className="user-actions">
        <div className="push-left">
          <div className="icon-action" data-test="action-icon">
            <img src={LikeIcon} alt="like" className="icon-like" />
            <span>{likes}</span>
          </div>
          <div className="icon-action" data-test="action-icon">
            <img src={DisLikeIcon} alt="dislike" className="icon-dislike" />
            <span>898</span>
          </div>
          <div className="icon-action" data-test="action-icon">
            <img src={CommentIcon} alt="like" className="icon-comment" />
            <span>{comments}</span>
          </div>
        </div>
        <div className="push-right">
          <div className="icon-action" data-test="action-icon">
            <img src={BookmarkIcon} alt="bookmark" className="icon-bookmark" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

AnimatedCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  author: PropTypes.shape({
    following: PropTypes.bool,
    username: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  readTime: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string
};
AnimatedCard.defaultProps = {
  slug: ""
};
export default AnimatedCard;
