import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import TextInput from "../Inputs/TextInput";
import {
  fetchResults,
  authSuggestArticles
} from "../../../redux/actions/searchActions";
import { isEmpty } from "../../../utils/helperFunctions";
import SearchPopOver from "../../PopOvers/SearchPopOver";
import checked from "../../../assets/icons/check.svg";
import circle from "../../../assets/icons/fire.svg";
import close from "../../../assets/icons/close.svg";
import notifs from "../../../assets/icons/notification.svg";
import defaultAvatar from "../../../assets/img/avatar.jpg";
import Thumbnail from "../Logo/Thumbnail";

import {
  fetchNotifications,
  readNotification,
  deleteNotification
} from "../../../redux/actions/notificationActions";

export class Navbar extends Component {
  state = {
    popOverOpen: false,
    searchQuery: "",
    isUserDetailsOpen: false,
    isNotificationOpen: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.closeSearchPopOver);
    document.addEventListener("mousedown", this.handleClickOutside);
    const { fetchNotifications: getNotifications } = this.props;
    getNotifications();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeSearchPopOver);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  onNotificationClick = ({ ref, id }) => {
    const { readNotification: gotoNotification, history } = this.props;
    gotoNotification({ id, ref }, history);
  };

  onNotificationClose = ({ id }) => {
    const { deleteNotification: closeNotification } = this.props;
    closeNotification(id);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState(() => ({ isNotificationOpen: false }));
    }
  };

  setSearchPopOverRef = node => {
    this.searchPopOverRef = node;
  };

  handleEnterPress = e => {
    const { searchQuery, fetchResults: searchArticles, history } = this.props;
    if (isEmpty(searchQuery)) {
      return;
    }
    if (e.keyCode === 13 && e.shiftKey === false) {
      searchArticles(searchQuery, 1, history);
    }
  };

  closeSearchPopOver = e => {
    if (this.searchPopOverRef && !this.searchPopOverRef.contains(e.target)) {
      this.setState({
        popOverOpen: false
      });
    }
  };

  handleOnChange = value => {
    clearTimeout(this.timeOut);
    const { authSuggestArticles: getSuggestions } = this.props;
    this.setState({
      popOverOpen: true,
      searchQuery: value
    });
    this.timeOut = setTimeout(() => getSuggestions(value), 1000);
  };

  openNotification = () =>
    this.setState(prevState => ({
      isNotificationOpen: !prevState.isNotificationOpen
    }));

  openSideMenu = () =>
    this.setState(prevState => ({
      isUserDetailsOpen: !prevState.isUserDetailsOpen
    }));

  render() {
    const {
      popOverOpen,
      searchQuery,
      isUserDetailsOpen,
      isNotificationOpen
    } = this.state;
    const {
      history,
      suggestedArticles,
      currentUser,
      isLoggedIn = true,
      notifier
    } = this.props;
    const { notifications, isFetching } = notifier;
    return (
      <div>
        <section
          style={{ margin: 0, boxSizing: "border-box", padding: 0 }}
          className="nav-bar"
        >
          <div className="nav-container" data-test="nav-container">
            <Thumbnail data-test="thumbnail" />
            <div className="col-md-6 col-sm-12 user-actions">
              <div className="search-filed">
                {history.location.pathname !== "/search" && (
                  <TextInput
                    type="search"
                    name="search"
                    placeholder="Search...."
                    onChange={e => this.handleOnChange(e.target.value)}
                    value={searchQuery}
                    onKeyDown={e => this.handleEnterPress(e)}
                    id="nav-search-input"
                    className={popOverOpen ? "active" : ""}
                  />
                )}
              </div>
              <div ref={this.setWrapperRef}>
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="notif-button"
                    data-test="notif-button"
                    onClick={this.openNotification}
                  >
                    <img alt="notif" src={notifs} />
                    {notifications.length > 0 && (
                      <p className="p">{notifications.length}</p>
                    )}
                  </button>
                ) : (
                  ""
                )}
                {isLoggedIn ? (
                  <div
                    className="notif-container"
                    style={{ display: isNotificationOpen ? "flex" : "none" }}
                  >
                    {notifications.length > 0 && (
                      <div className="notif-header">
                        <p className="title">Notifications</p>
                      </div>
                    )}
                    <div className="notif-wrapper">
                      {notifications.map((each, k) => (
                        <div
                          style={{
                            cursor: isFetching ? "progress" : ""
                          }}
                          key={Number(k + 1)}
                          className="notif-elmt"
                        >
                          <div className="notif-status">
                            <img
                              alt="read"
                              src={each.status === "unread" ? circle : checked}
                              height={15}
                              width={15}
                            />
                          </div>
                          <div
                            className="notif-message"
                            onClick={() => this.onNotificationClick(each)}
                            onKeyPress={() => this.onNotificationClick(each)}
                            data-test="notif-click"
                          >
                            {each.message}
                            <div className="notif-date">
                              {moment(each.createdAt).format("MMM Do YY")}
                            </div>
                          </div>
                          <button
                            id="close"
                            type="button"
                            className="notif-close"
                            data-test="notif-close"
                            style={{
                              cursor: isFetching ? "progress" : ""
                            }}
                            onClick={() => this.onNotificationClose(each)}
                          >
                            <img
                              alt="close"
                              src={close}
                              height={10}
                              width={10}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    {notifications.length <= 0 && (
                      <p className="notif-end">No more notifications</p>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isLoggedIn ? (
                <button
                  type="button"
                  className="current-user hide-sm"
                  onClick={this.openSideMenu}
                  id="user-dropdown"
                  data-test="user-dropdown"
                >
                  <img src={defaultAvatar} alt="user" className="user-avatar" />
                  <div className="user-name">
                    <p>John Doe</p>
                  </div>
                </button>
              ) : (
                ""
              )}
              <div className="other-actions">
                <div className="menu-container hide-md" />
                <div
                  className="drop-down"
                  style={{ display: isUserDetailsOpen ? "block" : "none" }}
                >
                  <div className="up-arrow" />
                  <div className="drop-down-content">
                    <ul className="links">
                      <li className="nav-link">
                        <Link to="/articles/new" className="main">
                          New Story
                        </Link>
                      </li>
                      {!isEmpty(currentUser) && (
                        <li>
                          <Link to={`/profiles/${currentUser.username}`}>
                            Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/stats">Stats</Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li>
                        <Link to="/sign_in">Sign out</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {history.location.pathname !== "/search" &&
          popOverOpen &&
          !isEmpty(suggestedArticles) && (
            <div ref={this.setSearchPopOverRef}>
              <SearchPopOver
                searchQuery={searchQuery}
                articles={suggestedArticles}
              />
            </div>
          )}
      </div>
    );
  }
}

export const mapStateToProps = ({
  auth: { currentUser },
  search,
  notifier
}) => ({
  ...search,
  currentUser,
  notifier
});

export const mapDispatchToProps = {
  fetchResults,
  authSuggestArticles,
  fetchNotifications,
  readNotification,
  deleteNotification
};

Navbar.propTypes = {
  authSuggestArticles: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  suggestedArticles: PropTypes.shape({}),
  currentUser: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
  notifier: PropTypes.shape({
    erroMessage: PropTypes.string,
    notifications: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  readNotification: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  searchQuery: "",
  suggestedArticles: {},
  currentUser: {},
  isLoggedIn: true
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchResults,
      authSuggestArticles,
      fetchNotifications,
      readNotification,
      deleteNotification
    }
  )(Navbar)
);
