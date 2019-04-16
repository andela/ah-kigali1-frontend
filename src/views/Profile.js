import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchCurrentUser as getCurrentUser } from "../redux/actions";
import { Loading } from "../components/common/Spinner/Loading";
import Confirm from "../components/common/Buttons/confirm";

const usernameFromLocalStorage = "username";
export class Profile extends Component {
  componentDidMount() {
    const { currentUser } = this.props;
    currentUser(usernameFromLocalStorage);
  }

  render() {
    const {
      profile: { bio, lastName, firstName, image },
      loading,
      error,
      history
    } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div className="profile">
        <div className="profile-left col-md-6">
          <div className="profile-left--fixed">
            <img src={image} alt="Avatar" className="profile-avatar" />
            <h1>
              {firstName} {lastName}
            </h1>
            <h2>UI/UX designer</h2>
            <p>{bio}</p>
            <Confirm
              title="Edit"
              onClick={() => history.push("/profiles-edit")}
            />
            <div className="socials">
              <div className="icon">
                <img
                  src={require("../assets/img/fb-icon.svg")}
                  alt="Facebook"
                />
              </div>
              <div className="icon">
                <img
                  src={require("../assets/img/twitter-icon.svg")}
                  alt="Twitter"
                />
              </div>
              <div className="icon">
                <img
                  src={require("../assets/img/google-plus-icon.svg")}
                  alt="Google"
                />
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
                <img
                  src={require("../assets/img/avatar-1.jpg")}
                  alt="Avatar"
                  className="avatar medium"
                />
                <div className="name_minutes medium">
                  <span className="author_name">Joe Doe</span> <br />
                  <span className="date_read_time">Nov 7,2018 . 3min read</span>
                </div>
              </div>
              <div
                className="main-article-img"
                style={{
                  backgroundImage: require("../assets/img/lifestyle.jpg")
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
                    <img
                      src={require("../assets/img/like-icon.svg")}
                      alt="likes"
                      className="likes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/dislike-icon.svg")}
                      alt="dislikes"
                      className="dislikes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/comment-icon.svg")}
                      alt="comments"
                      className="comments"
                    />
                    <div className="numbers">3,844</div>
                  </div>
                  <div className="right-icons">
                    <img
                      src={require("../assets/img/bookmark-icons.svg")}
                      alt="bookmark"
                      className="bookmark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="article-card">
              <div className="avatar-wrapper">
                <img
                  src={require("../assets/img/avatar-1.jpg")}
                  alt="Avatar"
                  className="avatar medium"
                />
                <div className="name_minutes medium">
                  <span className="author_name">Joe Doe</span> <br />
                  <span className="date_read_time">Nov 7,2018 . 3min read</span>
                </div>
              </div>
              <div
                className="main-article-img"
                style={{
                  backgroundImage: require("../assets/img/lifestyle.jpg")
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
                    <img
                      src={require("../assets/img/like-icon.svg")}
                      alt="likes"
                      className="likes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/dislike-icon.svg")}
                      alt="dislikes"
                      className="dislikes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/comment-icon.svg")}
                      alt="comments"
                      className="comments"
                    />
                    <div className="numbers">3,844</div>
                  </div>
                  <div className="right-icons">
                    <img
                      src={require("../assets/img/bookmark-icons.svg")}
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
                <img
                  src={require("../assets/img/avatar-1.jpg")}
                  alt="Avatar"
                  className="avatar medium"
                />
                <div className="name_minutes medium">
                  <span className="author_name">Joe Doe</span> <br />
                  <span className="date_read_time">Nov 7,2018 . 3min read</span>
                </div>
              </div>
              <div
                className="main-article-img"
                style={{
                  backgroundImage: require("../assets/img/background-2.jpg")
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
                    <img
                      src={require("../assets/img/like-icon.svg")}
                      alt="likes"
                      className="likes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/dislike-icon.svg")}
                      alt="dislikes"
                      className="dislikes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/comment-icon.svg")}
                      alt="comments"
                      className="comments"
                    />
                    <div className="numbers">3,844</div>
                  </div>
                  <div className="right-icons">
                    <img
                      src={require("../assets/img/bookmarked.svg")}
                      alt="bookmark"
                      className="bookmark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="article-card">
              <div className="avatar-wrapper">
                <img
                  src={require("../assets/img/avatar-1.jpg")}
                  alt="Avatar"
                  className="avatar medium"
                />
                <div className="name_minutes medium">
                  <span className="author_name">Joe Doe</span> <br />
                  <span className="date_read_time">Nov 7,2018 . 3min read</span>
                </div>
              </div>
              <div
                className="main-article-img"
                style={{
                  backgroundImage: require("../assets/img/background-2.jpg")
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
                    <img
                      src={require("../assets/img/like-icon.svg")}
                      alt="likes"
                      className="likes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/dislike-icon.svg")}
                      alt="dislikes"
                      className="dislikes"
                    />
                    <div className="numbers">3,844</div>
                    <img
                      src={require("../assets/img/comment-icon.svg")}
                      alt="comments"
                      className="comments"
                    />
                    <div className="numbers">3,844</div>
                  </div>
                  <div className="right-icons">
                    <img
                      src={require("../assets/img/bookmarked.svg")}
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
    );
  }
}
Profile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  currentUser: PropTypes.func.isRequired,
  profile: PropTypes.object
};
Profile.defaultProps = {
  history: {},
  error: "",
  loading: false,
  profile: {}
};
export const mapStateToProps = state => ({
  profile: state.user.profile,
  loading: state.user.loading,
  error: state.user.error
});

export const mapDispatchToProps = dispatch => ({
  currentUser: username => dispatch(getCurrentUser(username))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
