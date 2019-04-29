import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  stringToHtmlElement,
  calculateTimeStamp
} from "../../../utils/helperFunctions";

/* eslint global-require: "off" */
export class MainCard extends Component {
  redirectToArticle = () => {
    const { article, history } = this.props;
    return history.push(`/articles/${article.slug}`);
  };

  render() {
    const { article } = this.props;
    const {
      title,
      body,
      readTime,
      createdAt,
      author,
      comments,
      likesCount
    } = article;
    const { firstName, lastName, image, username } = author;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div className="left" onClick={() => this.redirectToArticle()}>
        <div className="article-card">
          <div className="avatar-wrapper">
            <img
              src={image || require("../../../assets/img/author.svg")}
              alt="Avatar"
              className="avatar"
            />
            <div className="name_minutes medium-main">
              <span className="author_name">
                {username && firstName && lastName
                  ? `${firstName} ${lastName}`
                  : username}
              </span>
              <br />
              <span className="date_read_time">
                {calculateTimeStamp(createdAt)}, {readTime}min read
              </span>
            </div>
          </div>
          <div
            className="main-article-img"
            style={{
              backgroundImage: `url(${stringToHtmlElement(body).firstImage})`
            }}
          >
            <span className="cat">TECH</span>
          </div>
          <div className="tex-content">
            <h3>{title}</h3>
            <div className="tex-content__body">
              {stringToHtmlElement(body).body}
            </div>
            <div className="icons">
              <div className="left-icons">
                <img
                  src={require("../../../assets/img/thumb-up-outline.svg")}
                  alt="likes"
                  className="likes"
                />
                <div className="numbers">{likesCount}</div>
                <img
                  src={require("../../../assets/img/thumb-down-outline.svg")}
                  alt="dislikes"
                  className="dislikes"
                />
                <div className="numbers">3,844</div>
                <img
                  src={require("../../../assets/img/comment-multiple-outline.svg")}
                  alt="comments"
                  className="comments"
                />
                <div className="numbers">{comments.length}</div>
              </div>
              <div className="right-icons">
                <img
                  src={require("../../../assets/img/bookmark.svg")}
                  alt="bookmark"
                  className="bookmark"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    readTime: PropTypes.number,
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      image: PropTypes.string,
      username: PropTypes.string
    }),
    comments: PropTypes.string,
    likesCount: PropTypes.number
  }).isRequired
};

export default withRouter(MainCard);
