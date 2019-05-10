/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Input from "../components/common/Inputs/TextInput";
import Button from "../components/common/Buttons/BasicButton";
import { ReportingForm } from "../components/reportingForm/ReportingForm";
import {
  fetchArticle,
  deleteArticle
} from "../redux/actions/readArticleActionCreator";
import { reportedArticle } from "../redux/actions/reportArticleActions";

import {
  isCurrentUserAuthor,
  stringToHtmlElement,
  calculateTimeStamp
} from "../utils/helperFunctions";
import MainArticle from "../components/common/Cards/main";
import { followUser } from "../redux/actions/followingActions";
import twitterIcon from "../assets/icons/twitter-icon.svg";
import facebookIcon from "../assets/icons/fb-icon.svg";
import thumbsUp from "../assets/img/like-icon.svg";
import authorImage from "../assets/img/user.jpg";
import dislikeIcon from "../assets/img/dislike-icon.svg";
import heartIcon from "../assets/img/heart.svg";
import bookmarkIcon from "../assets/img/bookmark-icons.svg";
import moreIcon from "../assets/icons/more.svg";
import ratingIcon from "../assets/icons/star.svg";
import emailIcon from "../assets/img/paper-plane.svg";
import ShareIcon from "../components/common/Link/Social";

export const mapStateToProps = ({ auth, fetchedArticle, following }) => ({
  currentUser: auth.currentUser,
  asideArticles: fetchedArticle.asideArticles,
  article: fetchedArticle,
  following
});

export const mapDispatchToProps = dispatch => ({
  deleteOneArticle: slug => dispatch(deleteArticle(slug)),
  fetchOneArticle: slug => dispatch(fetchArticle(slug)),
  followUser: (username, { location, history }) =>
    dispatch(followUser(username, { location, history })),
  reportArticle: (description, slug) =>
    dispatch(reportedArticle(description, slug))
});

export class Article extends Component {
  state = {
    slug: "",
    response: "",
    displayModal: false,
    reportingForm: false
  };

  componentDidMount = () => {
    const {
      fetchOneArticle,
      match: {
        params: { slug }
      }
    } = this.props;

    this.setState({ slug });
    fetchOneArticle(slug);
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillReceiveProps = nextProps => {
    const {
      article: { article },
      fetchOneArticle
    } = this.props;
    if (article && nextProps.match.params.slug !== article.slug) {
      this.setState({ slug: nextProps.match.params.slug });
      fetchOneArticle(nextProps.match.params.slug);
    }
    return false;
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(() => ({ displayModal: false }));
    }
  };

  toggleReactionsModal = () => {
    const { displayModal } = this.state;
    if (displayModal === true) {
      return this.setState({ displayModal: false });
    }
    return this.setState({ displayModal: true });
  };

  toggleReportingModal = () => {
    const { reportingForm } = this.state;
    if (reportingForm) {
      return this.setState({ reportingForm: false });
    }
    return this.setState({ reportingForm: true, displayModal: false });
  };

  displayCommentsOnDesktop = comments =>
    comments.length
      ? comments.map(comment => {
          const { author, body, like, id } = comment;
          const { username, image, firstName, lastName } = author;
          return (
            <div className="article-comments--existing__desktop" key={id}>
              <div className="avatar-wrapper comment-avatar-wrapper">
                <img
                  src={image || authorImage}
                  alt="Avatar"
                  className="avatar"
                />
                <span className="comment-author_name ">
                  {username && firstName && lastName
                    ? `${firstName} ${lastName}`
                    : username}
                </span>
              </div>
              <div className="article-comments--existing-text">
                {body}
                <div className="article-comments--actions">
                  <span className="comment-like">
                    <div className="icons">
                      <img src={heartIcon} alt="likes" className="likes" />
                      <div>{like}</div>
                    </div>
                  </span>
                  <div className="comment-edit-delete">
                    <span className="comment-edit"> Edit </span>
                    <span className="comment-delete"> Delete </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : "";

  displayCommentsOnMobileDevices = comments =>
    comments.length
      ? comments.map(comment => {
          const { author, body, like, id } = comment;
          const { username, image, firstName, lastName } = author;
          return (
            <div
              className="article-comments--existing__mobile col-md-6 col-av-12 col-sm-12"
              key={id}
            >
              <div className="blog-card">
                <div className="avatar-wrapper comment-avatar-wrapper">
                  <img
                    src={image || authorImage}
                    alt="Avatar"
                    className="avatar"
                  />
                  <span className="username">
                    {username && firstName && lastName
                      ? `${firstName} ${lastName}`
                      : username}
                  </span>
                </div>
                <div className="col-md-9  col-sm-12">
                  <div className="card-content">
                    <div className="info">
                      <div className="col-md-3 col-sm-4" />
                    </div>
                    <p className="card-text">{body}</p>
                    <div className="article-comments--actions">
                      <span className="comment-like">
                        <div className="icons">
                          <img src={heartIcon} alt="likes" className="likes" />
                          <div>{like}</div>
                        </div>
                      </span>
                      <div className="comment-edit-delete">
                        <span className="comment-edit"> Edit </span>
                        <span className="comment-delete"> Delete </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : "";

  redirectToEdit = () => {
    const { slug } = this.state;
    const {
      history: { push }
    } = this.props;
    push(`/articles/${slug}/edit`);
  };

  handleDeleteArticle = () => {
    const { deleteOneArticle, history } = this.props;
    const { slug } = this.state;
    deleteOneArticle(slug).then(response => {
      if (response.status === 200) {
        this.setState({ response: "Article deleted successfully" });
        return setTimeout(() => history.push("/"), 3000);
      }
    });
  };

  followAuthor = username => {
    const { followUser: followOther, history, location } = this.props;
    followOther(username, { history, location });
  };

  render() {
    const { response, displayModal, reportingForm, slug } = this.state;
    const {
      article,
      asideArticles,
      currentUser,
      history,
      reportArticle
    } = this.props;

    const { isFetching, message, article: retrievedArticle } = article;

    let author,
      body,
      title,
      tagsList,
      comments,
      username,
      createdAt,
      readTime,
      image,
      firstName,
      lastName,
      following;
    if (retrievedArticle) {
      ({
        author,
        body,
        title,
        tagsList,
        comments,
        createdAt,
        readTime,
        comments
      } = retrievedArticle);
      ({ username, firstName, following, lastName, image } = author);
    }
    const isAuthor = isCurrentUserAuthor(username, currentUser);
    const {
      location: { host, pathname }
    } = window;
    const currentUrl = `${host}${pathname}`;
    const { following: followObject } = this.props;
    if (typeof followObject.status === "boolean") {
      following = followObject.status;
    }
    return (
      <div>
        {message && message !== "Article found successfully" ? (
          <p className="success-message">{history.push("/not_found")}</p>
        ) : (
          <p>{response}</p>
        )}
        {!isFetching && retrievedArticle ? (
          <div className="article-container">
            <article className="article">
              <div className="article-author">
                <div className="avatar-wrapper">
                  <img
                    src={image || authorImage}
                    alt="Avatar"
                    className="avatar"
                  />
                  <div className="name_minutes">
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
                {isAuthor ? (
                  ""
                ) : (
                  <button
                    className={following ? "focus" : "author-follow"}
                    style={{
                      cursor: followObject.isFetching ? "progress" : "pointer"
                    }}
                    type="button"
                    disabled={followObject.isFetching}
                    onClick={() => this.followAuthor(username)}
                    data-test="follow_author"
                  >
                    {following ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="article-content">
                <div className="article-title">{title}</div>
                <div className="article-text">
                  {stringToHtmlElement(body).body}
                </div>
                {isAuthor ? (
                  <div>
                    <Button
                      className="btn delete_article"
                      onClick={this.handleDeleteArticle}
                      title="Delete"
                      data-test="delete_article"
                    />
                    <Button
                      className="btn edit_article"
                      onClick={this.redirectToEdit}
                      title="Edit"
                    />{" "}
                  </div>
                ) : (
                  ""
                )}

                <div className="tags">
                  {!isFetching && tagsList.length
                    ? tagsList.map(tag => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))
                    : ""}
                </div>
                <hr className="line__title" />
                <div className="article-comments">
                  <div className="article-comments--new">
                    <div className="avatar-wrapper comment-avatar-wrapper">
                      <img
                        src={image || authorImage}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <Input
                      className="article-comments--new-text"
                      type="text"
                      value="Add new comment here"
                      placeholder="Add new comment here"
                      name="new-comment"
                      data-test="new-comment"
                    />
                  </div>
                  {this.displayCommentsOnDesktop(comments)}
                  {this.displayCommentsOnMobileDevices(comments)}
                  <div className="article-comments--more">
                    load-more comments.....
                  </div>
                </div>
              </div>
            </article>
            <aside className="article-share">
              <div className="share-icons">
                <img className="share-icon" src={thumbsUp} alt="logo" />
                <img className="share-icon" src={dislikeIcon} alt="logo" />
                <img className="share-icon" src={bookmarkIcon} alt="logo" />

                <ShareIcon
                  image={facebookIcon}
                  href={`https://www.facebook.com/sharer/sharer.php?&u=${currentUrl}`}
                />
                <ShareIcon
                  image={twitterIcon}
                  href={`//twitter.com/share?url=${currentUrl}&text=${currentUrl}&hashtags=authorsHeaven,software development`}
                />
                <ShareIcon
                  image={emailIcon}
                  href={`mailto:?subject=Sharing the inspiring article&body=${currentUrl}`}
                />
                <img className="share-icon" src={ratingIcon} alt="logo" />
                <img
                  className="share-icon"
                  src={moreIcon}
                  alt="logo"
                  onClick={this.toggleReactionsModal}
                />
              </div>
              {displayModal ? (
                <div className="popup__report" ref={this.setWrapperRef}>
                  <div>
                    <p onClick={this.toggleReportingModal}>Report </p>
                    <hr />
                    <p>Rate</p>
                    <hr />
                  </div>
                </div>
              ) : (
                ""
              )}
            </aside>
            {reportingForm ? (
              <ReportingForm
                reportArticle={reportArticle}
                slug={slug}
                cancelReport={this.toggleReportingModal}
              />
            ) : (
              ""
            )}
            <div className="right article-others">
              <div className="right">
                {Object.values(asideArticles).length
                  ? Object.values(asideArticles).map(asideArticle => (
                      <div
                        className="article-card article-other"
                        key={asideArticle.slug}
                      >
                        <MainArticle article={asideArticle} />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Article.propTypes = {
  fetchOneArticle: PropTypes.func.isRequired,
  reportArticle: PropTypes.func.isRequired,
  deleteOneArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  article: PropTypes.shape({
    article: PropTypes.shape({
      author: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
        username: PropTypes.string
      }),
      body: PropTypes.string,
      title: PropTypes.string,
      tagsList: PropTypes.arrayOf(PropTypes.string),
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            image: PropTypes.string,
            username: PropTypes.string
          }),
          body: PropTypes.string,
          like: PropTypes.number,
          id: PropTypes.string
        })
      ),
      createdAt: PropTypes.string,
      readTime: PropTypes.number
    })
  }).isRequired,
  asideArticles: PropTypes.arrayOf(
    PropTypes.shape({
      article: PropTypes.shape({
        article: PropTypes.shape({
          author: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            image: PropTypes.string,
            username: PropTypes.string
          }),
          body: PropTypes.string,
          title: PropTypes.string,
          tagsList: PropTypes.arrayOf(PropTypes.string),
          comments: PropTypes.arrayOf(
            PropTypes.shape({
              author: PropTypes.shape({
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                image: PropTypes.string,
                username: PropTypes.string
              }),
              body: PropTypes.string,
              like: PropTypes.number,
              id: PropTypes.string
            })
          ),
          createdAt: PropTypes.string,
          readTime: PropTypes.string
        })
      })
    })
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    })
  }).isRequired,
  followUser: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
  location: PropTypes.shape([]).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Article)
);
