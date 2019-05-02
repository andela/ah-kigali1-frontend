import React from "react";
import PropTypes from "prop-types";

const AnimatedCard = props => {
  const {
    title,
    likes,
    comments,
    description,
    author,
    readTime,
    createdAt
  } = props;
  return (
    <div className="blog-card">
      <div className="meta">
        <div
          className="article-thumbnail"
          style={{
            backgroundImage: `url(${require("../../../assets/img/no-thumbnail.png")})`
          }}
        />
      </div>
      <div className="card-content">
        <div className="info">
          <img
            src={author.image || require("../../../assets/img/user.png")}
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
        <div className="card-title">
          <h2>{title}</h2>
        </div>
        <p className="card-text">
          {description}......
          <a href="/" className="read-more">
            Read more
          </a>
        </p>
        <div className="user-actions">
          <div className="push-left">
            <div className="icon-action">
              <img
                src={require("../../../assets/img/like-icon.svg")}
                alt="like"
                className="icon-like"
              />
              <span>{likes}</span>
            </div>
            <div className="icon-action">
              <img
                src={require("../../../assets/img/dislike-icon.svg")}
                alt="dislike"
                className="icon-dislike"
              />
              <span>898</span>
            </div>
            <div className="icon-action">
              <img
                src={require("../../../assets/img/comment-icon.svg")}
                alt="like"
                className="icon-comment"
              />
              <span>{comments}</span>
            </div>
          </div>
          <div className="push-right">
            <div className="icon-action">
              <img
                src={require("../../../assets/img/bookmark-icons.svg")}
                alt="bookmark"
                className="icon-bookmark"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  createdAt: PropTypes.string.isRequired
};
export default AnimatedCard;
