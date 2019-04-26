/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { stringToHtmlElement } from "../utils/helpers/bodyParser";
import Navbar from "../components/common/AppBars/navBar";
import Input from "../components/common/Inputs/TextInput";
import {
  fetchArticle,
  deleteArticle
} from "../redux/actions/readArticleActionCreator";
import Button from "../components/common/Buttons/BasicButton";
import calculateTimeStamp from "../utils/helpers/calculateTimeStamp";
import MainArticle from "../components/common/Cards/main";

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  asideArticles: state.fetchedArticle.asideArticles.articles,
  article: state.fetchedArticle
});
export const mapDispatchToProps = dispatch => ({
  deleteOneArticle: slug => dispatch(deleteArticle(slug)),
  fetchOneArticle: slug => dispatch(fetchArticle(slug))
});

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: "",
      response: ""
    };
  }

  componentDidMount = () => {
    const { fetchOneArticle, match } = this.props;
    const { slug } = match.params;

    this.setState({ slug });
    fetchOneArticle(slug);
  };

  redirectToEdit = () => {
    const { slug } = this.state;
    console.log("Here there, here is the slug", slug);
    this.props.history.push(`/articles/${slug}/edit`);
  };

  componentWillReceiveProps = nextProps => {
    const {
      article: { article },
      fetchOneArticle
    } = this.props;
    if (article && nextProps.match.params.slug !== article.slug) {
      fetchOneArticle(nextProps.match.params.slug);
    }
    return false;
  };

  handleDeleteArticle = () => {
    const { deleteOneArticle, history } = this.props;
    const { slug } = this.state;
    deleteOneArticle(slug).then(response => {
      if (response.status === 200) {
        this.setState({ response: "Article deleted successfully" });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else if (response.status === 404) {
        this.setState({ response: "Article not found" });
      } else if (response.status === 401) {
        this.setState({
          response: "We are unable to authenticate you. Consider logging in"
        });
      }
    });
  };

  render() {
    const { response } = this.state;
    const { article, asideArticles } = this.props;
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
      lastName;
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
      ({ username, firstName, lastName, image } = author);
    }

    return (
      <div>
        <Navbar />
        {message && message !== "Article found successfully" ? (
          <p className="success-message">
            {this.props.history.push("/not_found")}
          </p>
        ) : (
          <p>{response}</p>
        )}
        {!isFetching && retrievedArticle ? (
          <div className="article-container">
            <article className="article">
              <div className="article-author">
                <div className="avatar-wrapper">
                  <img
                    src={image || require("../assets/img/author.svg")}
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
                <button className="author-follow" type="button">
                  Follow
                </button>
              </div>
              <div className="article-content">
                <div className="article-title">{title}</div>
                <div className="article-text">
                  {stringToHtmlElement(body).body}
                </div>
                <Button
                  className="btn delete_article"
                  onClick={() => this.handleDeleteArticle()}
                  title="Delete"
                />
                <Button
                  className="btn delete_article"
                  onClick={() => this.redirectToEdit()}
                  title="Edit"
                />
                <div className="tags">
                  {!isFetching && tagsList.length
                    ? tagsList.map(tag => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))
                    : false}
                </div>
                <hr className="line__title" />
                <div className="article-comments">
                  <div className="article-comments--new">
                    <div className="avatar-wrapper comment-avatar-wrapper">
                      <img
                        src={image || require("../assets/img/author.svg")}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <Input
                      className="article-comments--new-text"
                      type="text"
                      value="Add new comment here"
                      placeholder="Add new comment here"
                      onChange={() => <p>Value have changed</p>}
                      name="new-comment"
                    />
                  </div>

                  {comments.length
                    ? comments.map(comment => {
                        const { author, body, like, id } = comment;
                        const { username, image, firstName, lastName } = author;
                        return (
                          <div
                            className="article-comments--existing__desktop"
                            key={id}
                          >
                            <div className="avatar-wrapper comment-avatar-wrapper">
                              <img
                                src={
                                  image || require("../assets/img/author.svg")
                                }
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
                                    <img
                                      src={require("../assets/img/heart.svg")}
                                      alt="likes"
                                      className="likes"
                                    />
                                    <div>{like}</div>
                                  </div>
                                </span>
                                <div className="comment-edit-delete">
                                  <span className="comment-edit"> Edit </span>
                                  <span className="comment-delete">
                                    {" "}
                                    Delete{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : false}
                  {comments.length
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
                                  src={
                                    image || require("../assets/img/author.svg")
                                  }
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
                                        <img
                                          src={require("../assets/img/heart.svg")}
                                          alt="likes"
                                          className="likes"
                                        />
                                        <div>{like}</div>
                                      </div>
                                    </span>
                                    <div className="comment-edit-delete">
                                      <span className="comment-edit">
                                        {" "}
                                        Edit{" "}
                                      </span>
                                      <span className="comment-delete">
                                        {" "}
                                        Delete{" "}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : false}

                  <div className="article-comments--more">
                    load-more comments.....
                  </div>
                </div>
              </div>
            </article>

            <aside className="article-share">
              <div className="share-icons">
                <img
                  className="share-icon"
                  src={require("../assets/img/like-icon.svg")}
                  alt="logo"
                />
                <img
                  className="share-icon"
                  src={require("../assets/img/dislike-icon.svg")}
                  alt="logo"
                />
                <img
                  className="share-icon"
                  src={require("../assets/img/bookmark-icons.svg")}
                  alt="logo"
                />
                <img
                  className="share-icon"
                  src={require("../assets/img/fb-icon.svg")}
                  alt="logo"
                />
                <img
                  className="share-icon"
                  src={require("../assets/img/twitter-icon.svg")}
                  alt="logo"
                />
              </div>
            </aside>
            <div className="right article-others">
              <div className="right">
                {asideArticles.length
                  ? asideArticles.map(asideArticle => (
                      <div className="article-card article-other">
                        <MainArticle
                          article={asideArticle}
                          key={asideArticle.slug}
                        />
                      </div>
                    ))
                  : false}
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}
Article.propTypes = {
  fetchOneArticle: PropTypes.func.isRequired,
  deleteOneArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
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
  }).isRequired
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Article)
);
