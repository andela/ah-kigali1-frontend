import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchCurrentUser as getCurrentUser } from "../redux/actions/profileActions";
import { Loading } from "../components/common/Spinner/Loading";
import BasicButton from "../components/common/Buttons/BasicButton";
import forbidden from "../assets/img/403.png";
import defaultImage from "../assets/img/defaultImage.png";
import twitterIcon from "../assets/icons/twitter-icon.svg";
import facebookIcon from "../assets/icons/fb-icon.svg";
import googleIcon from "../assets/icons/google-plus-icon.svg";
import thumbsUp from "../assets/img/like-icon.svg";
import dislikeIcon from "../assets/img/dislike-icon.svg";
import commentsIcon from "../assets/img/comment-icon.svg";
import bookmarkedIcon from "../assets/img/bookmarked.svg";
import bookmarkIcon from "../assets/img/bookmark-icons.svg";
import avatar1 from "../assets/img/avatar-1.jpg";
import lifestyle from "../assets/img/lifestyle.jpg";
import background2 from "../assets/img/background-2.jpg";

export class Profile extends Component {
  componentDidMount() {
    const { currentUser } = this.props;
    const {
      match: {
        params: { username }
      }
    } = this.props;
    currentUser(username);
  }

  render() {
    const {
      profile: { bio, lastName, firstName, image },
      loading,
      error,
      history,
      loggedInUser
    } = this.props;
    const {
      match: {
        params: { username }
      }
    } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error === "No user with that name") {
      history.push(`/not_found`);
    }
    if (loggedInUser) {
      if (loggedInUser.username !== username) {
        return <img className="loading" src={forbidden} alt="Forbidden" />;
      }
    }
    return (
      <div>
        <div className="profile">
          <div className="profile-left col-md-6">
            <div className="profile-left--fixed">
              <img
                src={image || defaultImage}
                alt="Avatar"
                className="profile-avatar"
              />
              <h1>
                {firstName} {lastName}
              </h1>
              <h2>UI/UX designer</h2>
              <p>{bio}</p>
              {loggedInUser && (
                <BasicButton
                  title="Edit"
                  onClick={() => history.push(`/profiles/${username}/edit`)}
                />
              )}

              <div className="socials">
                <div className="icon">
                  <img src={facebookIcon} alt="Facebook" />
                </div>
                <div className="icon">
                  <img src={twitterIcon} alt="Twitter" />
                </div>
                <div className="icon">
                  <img src={googleIcon} alt="Google" />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-right col-md-6">
            <div className="tabs">
              <ul className="horizontal-list">
                <li className="active">
                  <a href="#latest">latest</a>
                </li>
                <li>
                  <a href="#bookmarks">Bookmarks</a>
                </li>
              </ul>
            </div>
            <div id="latest">
              <div className="article-card">
                <div className="avatar-wrapper">
                  <img src={avatar1} alt="Avatar" className="avatar medium" />
                  <div className="name_minutes medium">
                    <span className="author_name">Joe Doe</span> <br />
                    <span className="date_read_time">
                      Nov 7,2018 . 3min read
                    </span>
                  </div>
                </div>
                <div
                  className="main-article-img"
                  style={{
                    backgroundImage: { lifestyle }
                  }}
                />
                <div className="tex-content">
                  <h3>Only I can change my life. No one can do it me</h3>
                  <div className="tex-content__body">
                    Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky
                    tongue andouille kevin meatloaf fatback shank bacon turkey
                    turducken spare ribs chuck.
                  </div>
                  <div className="icons">
                    <div className="left-icons">
                      <img src={thumbsUp} alt="likes" className="likes" />
                      <div className="numbers">3,844</div>
                      <img
                        src={dislikeIcon}
                        alt="dislikes"
                        className="dislikes"
                      />
                      <div className="numbers">3,844</div>
                      <img
                        src={commentsIcon}
                        alt="comments"
                        className="comments"
                      />
                      <div className="numbers">3,844</div>
                    </div>
                    <div className="right-icons">
                      <img
                        src={bookmarkIcon}
                        alt="bookmark"
                        className="bookmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="article-card">
                <div className="avatar-wrapper">
                  <img src={avatar1} alt="Avatar" className="avatar medium" />
                  <div className="name_minutes medium">
                    <span className="author_name">Joe Doe</span> <br />
                    <span className="date_read_time">
                      Nov 7,2018 . 3min read
                    </span>
                  </div>
                </div>
                <div
                  className="main-article-img"
                  style={{
                    backgroundImage: { lifestyle }
                  }}
                />
                <div className="tex-content">
                  <h3>Only I can change my life. No one can do it me</h3>
                  <div className="tex-content__body">
                    Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky
                    tongue andouille kevin meatloaf fatback shank bacon turkey
                    turducken spare ribs chuck.
                  </div>
                  <div className="icons">
                    <div className="left-icons">
                      <img src={thumbsUp} alt="likes" className="likes" />
                      <div className="numbers">3,844</div>
                      <img
                        src={dislikeIcon}
                        alt="dislikes"
                        className="dislikes"
                      />
                      <div className="numbers">3,844</div>
                      <img
                        src={commentsIcon}
                        alt="comments"
                        className="comments"
                      />
                      <div className="numbers">3,844</div>
                    </div>
                    <div className="right-icons">
                      <img
                        src={bookmarkIcon}
                        alt="bookmark"
                        className="bookmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="bookmarks">
              <div className="article-card">
                <div className="avatar-wrapper">
                  <img src={avatar1} alt="Avatar" className="avatar medium" />
                  <div className="name_minutes medium">
                    <span className="author_name">Joe Doe</span> <br />
                    <span className="date_read_time">
                      Nov 7,2018 . 3min read
                    </span>
                  </div>
                </div>
                <div
                  className="main-article-img"
                  style={{
                    backgroundImage: { background2 }
                  }}
                />
                <div className="tex-content">
                  <h3>Only I can change my life. No one can do it me</h3>
                  <div className="tex-content__body">
                    Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky
                    tongue andouille kevin meatloaf fatback shank bacon turkey
                    turducken spare ribs chuck.
                  </div>
                  <div className="icons">
                    <div className="left-icons">
                      <img src={thumbsUp} alt="likes" className="likes" />
                      <div className="numbers">3,844</div>
                      <img
                        src={dislikeIcon}
                        alt="dislikes"
                        className="dislikes"
                      />
                      <div className="numbers">3,844</div>
                      <img
                        src={commentsIcon}
                        alt="comments"
                        className="comments"
                      />
                      <div className="numbers">3,844</div>
                    </div>
                    <div className="right-icons">
                      <img
                        src={bookmarkedIcon}
                        alt="bookmark"
                        className="bookmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="article-card">
                <div className="avatar-wrapper">
                  <img src={avatar1} alt="Avatar" className="avatar medium" />
                  <div className="name_minutes medium">
                    <span className="author_name">Joe Doe</span> <br />
                    <span className="date_read_time">
                      Nov 7,2018 . 3min read
                    </span>
                  </div>
                </div>
                <div
                  className="main-article-img"
                  style={{
                    backgroundImage: { background2 }
                  }}
                />
                <div className="tex-content">
                  <h3>Only I can change my life. No one can do it me</h3>
                  <div className="tex-content__body">
                    Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky
                    tongue andouille kevin meatloaf fatback shank bacon turkey
                    turducken spare ribs chuck.
                  </div>
                  <div className="icons">
                    <div className="left-icons">
                      <img src={thumbsUp} alt="likes" className="likes" />
                      <div className="numbers">3,844</div>
                      <img
                        src={dislikeIcon}
                        alt="dislikes"
                        className="dislikes"
                      />
                      <div className="numbers">3,844</div>
                      <img
                        src={commentsIcon}
                        alt="comments"
                        className="comments"
                      />
                      <div className="numbers">3,844</div>
                    </div>
                    <div className="right-icons">
                      <img
                        src={bookmarkedIcon}
                        alt="bookmark"
                        className="bookmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  currentUser: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  loggedInUser: PropTypes.shape({}).isRequired,
  error: PropTypes.string
};

Profile.defaultProps = {
  history: {},
  loading: false,
  error: ""
};

export const mapStateToProps = state => ({
  profile: state.user.profile,
  loading: state.user.loading,
  error: state.user.error,
  loggedInUser: state.auth.currentUser
});

export const mapDispatchToProps = dispatch => ({
  currentUser: username => dispatch(getCurrentUser(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
