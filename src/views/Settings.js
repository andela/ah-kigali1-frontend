import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchCurrentUser as getCurrentUser,
  saveUpdatedUser
} from "../redux/actions";
import ErrorMessage from "../components/common/Message/error";
import SuccessMessage from "../components/common/Message/success";

const usernameFromLocalStorage = "username";

export class Settings extends Component {
  state = {
    currentState: "emailSettings"
  };

  componentDidMount() {
    const { currentUser } = this.props;
    currentUser(usernameFromLocalStorage);
  }

  handleChangeClass = e => {
    this.setState({
      currentState: e.target.name
    });
  };

  handleChange = () => {
    const {
      updatedUser,
      profile: { allowNotifications }
    } = this.props;
    updatedUser({
      allowNotifications: !allowNotifications,
      username: usernameFromLocalStorage
    });
  };

  getCurrentSection = () => {
    const {
      profile: { allowNotifications }
    } = this.props;
    const { currentState } = this.state;
    if (currentState === "passwordSettings") {
      return (
        <section id="password-settings">
          <h2 className="setting-title">Update Password</h2>
          <form>
            <input
              type="password"
              name="password"
              id="new-password"
              placeholder="New password"
            />
            <input
              type="password"
              name="confirm-new-password"
              id="confirm-new-password"
              placeholder="Confirm new password"
            />
            <input
              type="password"
              name="current-password"
              id="current-password"
              placeholder="Current password"
            />
            <input type="button" value="Save" />
          </form>
        </section>
      );
    }
    if (currentState === "accountSettings") {
      return (
        <section id="account-settings">
          <h2 className="setting-title">General Account Settings</h2>
          <h3>Delete my account</h3>
          <p>Permanently delete your account and all your content</p>
          <a href="#account-settings" className="danger">
            Delete
          </a>
        </section>
      );
    }
    return (
      <section id="email-settings">
        <h2 className="setting-title">Email Settings</h2>
        <div className="notification-settings">
          <h3>Allow email notification</h3>
          <label className="notification-toggle">
            <input
              className="allow_notifications"
              name="allowNotifications"
              onChange={this.handleChange}
              type="checkbox"
              checked={allowNotifications}
            />
            <span className="on-off">
              <span className="toggle" />
              <span className="on">On</span>
              <span className="off">Off</span>
            </span>
          </label>
        </div>
      </section>
    );
  };

  render() {
    const { currentState } = this.state;
    const {
      error,
      message,
      profile: { allowNotifications }
    } = this.props;
    return (
      <div className="user-settings">
        <div className="col-md-6 col-av-8 col-sm-12">
          <div>{error ? <ErrorMessage title={error} /> : ""}</div>
          <div>
            {message ? (
              <SuccessMessage
                title={
                  allowNotifications
                    ? "Notifications Turned ON"
                    : "Notifications Turned OFF"
                }
              />
            ) : (
              ""
            )}
          </div>
          <div className="row" style={{ minHeight: "350px" }}>
            <div className="col-md-4 col-av-4 hide-sm">
              <h2 className="setting-title">Settings</h2>
              <ul className="settings-options">
                <li onClick={this.handleChangeClass} onKeyPress>
                  <a
                    href="#email-settings"
                    name="emailSettings"
                    className={currentState === "emailSettings" ? "active" : ""}
                  >
                    Email
                  </a>
                </li>
                <li onClick={this.handleChangeClass} onKeyPress>
                  <a
                    href="#password-settings"
                    name="passwordSettings"
                    className={
                      currentState === "passwordSettings" ? "active" : ""
                    }
                  >
                    Password
                  </a>
                </li>
                <li onClick={this.handleChangeClass} onKeyPress>
                  <a
                    href="#account-settings"
                    name="accountSettings"
                    className={
                      currentState === "accountSettings" ? "active" : ""
                    }
                  >
                    Account
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-8 col-av-8 col-sm-12">
              <div className="settings-content">{this.getCurrentSection()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  error: PropTypes.string,
  profile: PropTypes.object,
  message: PropTypes.string,
  updatedUser: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired
};
Settings.defaultProps = {
  error: "",
  message: "",
  profile: {}
};
export const mapStateToProps = state => ({
  profile: state.user.profile,
  error: state.user.error,
  message: state.user.message
});

export const mapDispatchToProps = dispatch => ({
  currentUser: username => dispatch(getCurrentUser(username)),
  updatedUser: (data, username) => dispatch(saveUpdatedUser(data, username))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
