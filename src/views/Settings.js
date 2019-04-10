/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchCurrentUser as getCurrentUser,
  saveUpdatedUser,
  InputHandle,
  changePassword,
  deleteProfile
} from "../redux/actions/profileActions";
import Message from "../components/common/Message/message";
import BasicButton from "../components/common/Buttons/FormButton";
import TextInput from "../components/common/Inputs/TextInput";
import Dialog from "../components/common/Dialog/Dialog";
import { verifyPassword } from "../helpers/helpers";

export class Settings extends Component {
  state = {
    currentState: "emailSettings",
    validationError: "",
    isPasswordMatching: true,
    validationColor: "red",
    passwordMeter: ""
  };

  componentDidMount() {
    const {
      currentUser,
      loggedInUser: { username }
    } = this.props;
    currentUser(username);
  }

  getCurrentSection = () => {
    const {
      profile: { allowNotifications },
      currentPassword,
      password,
      confirmPassword
    } = this.props;
    const {
      currentState,
      validationError,
      validationColor,
      isPasswordMatching,
      passwordMeter
    } = this.state;

    if (currentState === "passwordSettings") {
      return (
        <section id="password-settings">
          <h2 className="setting-stitle">Update Password</h2>
          <TextInput
            type="password"
            name="currentPassword"
            id="current-password"
            placeholder="Current password"
            value={currentPassword}
            onChange={this.handleOnChange}
          />
          <TextInput
            type="password"
            name="password"
            id="new-password"
            placeholder="New password"
            value={password}
            onChange={this.handleOnChange}
          />
          <div style={{ color: `${validationColor}` }}>{passwordMeter}</div>
          <TextInput
            className="input-change"
            type="password"
            name="confirmPassword"
            id="confirm-new-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={this.handleOnChange}
          />
          <div style={{ color: `${validationColor}` }}>{validationError}</div>
          <BasicButton
            className="changePassCode"
            onClick={this.updatePassword}
            type="button"
            value="Save"
            disabled={isPasswordMatching}
          />
        </section>
      );
    }

    if (currentState === "accountSettings") {
      return (
        <section id="account-settings">
          <h2 className="setting-title">General Account Settings</h2>
          <h3>Delete my account</h3>
          <p>Permanently delete your account and all your content</p>
          <Dialog className="delete-pro" deleteProfile={this.deleteProfile} />
        </section>
      );
    }

    return (
      <section id="email-settings">
        <h2 className="setting-title">Email Settings</h2>
        <div className="notification-settings">
          <h3>Allow email notification</h3>
          <div className="onoffswitch">
            <input
              type="checkbox"
              name="onoffswitch"
              className="onoffswitch-checkbox"
              id="myonoffswitch"
              onChange={this.handleChange}
              checked={allowNotifications}
            />
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
              <span className="onoffswitch-inner" />
              <span className="onoffswitch-switch" />
            </label>
          </div>
        </div>
      </section>
    );
  };

  updatePassword = () => {
    const {
      password,
      currentPassword,
      onChangePassword,
      profile: { username }
    } = this.props;
    const data = { newPassword: password, currentPassword };
    onChangePassword(data, username);
  };

  handleChange = () => {
    const {
      updatedUser,
      profile: { allowNotifications },
      loggedInUser: { username }
    } = this.props;
    updatedUser({
      allowNotifications: !allowNotifications,
      username
    });
  };

  deleteProfile = () => {
    const {
      onDeleteProfile,
      history,
      loggedInUser: { username }
    } = this.props;
    onDeleteProfile(username);
    setTimeout(() => {
      history.push(`/sign_in`);
    }, 2000);
  };

  handleOnChange = ({ target: { name, value } }) => {
    const { onInputChange } = this.props;
    onInputChange({ field: name, value }).then(() => {
      const { password, confirmPassword } = this.props;
      if (password) {
        this.setState({
          passwordMeter: `${verifyPassword(password)}`,
          validationColor: `${
            verifyPassword(password) ===
            "The password should be an alphanumeric with at least 8 characters"
              ? "red"
              : "green"
          }`
        });
      }
      if (confirmPassword) {
        if (password !== confirmPassword) {
          this.setState({
            validationError: "Password don't match",
            isPasswordMatching: true,
            validationColor: "red"
          });
        } else {
          this.setState({
            validationError: "Password Matches",
            isPasswordMatching: false,
            validationColor: "green"
          });
        }
      }
    });
  };

  handleChangeClass = ({ target: { name } }) => {
    this.setState({
      currentState: name
    });
  };

  render() {
    const { currentState } = this.state;
    const { error, message } = this.props;
    return (
      <div>
        <div className="user-settings">
          <div className="col-md-6 col-av-8 col-sm-12">
            <div className="msg">
              {error ? (
                <Message
                  title={error}
                  classType="error-msg"
                  icons="fa fa-times-circle"
                />
              ) : (
                ""
              )}
              {message ? (
                <Message
                  title={message}
                  classType="success-msg"
                  icons="fa fa-check"
                />
              ) : (
                ""
              )}
            </div>
            <div className="row" style={{ minHeight: "350px" }}>
              <div className="col-md-4 col-av-4 hide-sm">
                <h2 className="setting-title">Settings</h2>
                <ul className="settings-options">
                  <li onClick={this.handleChangeClass}>
                    <a
                      href="#email-settings"
                      name="emailSettings"
                      className={
                        currentState === "emailSettings" ? "active" : ""
                      }
                    >
                      Email
                    </a>
                  </li>
                  <li onClick={this.handleChangeClass}>
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
                  <li onClick={this.handleChangeClass}>
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
                <div className="settings-content">
                  {this.getCurrentSection()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  profile: PropTypes.shape({}),
  loggedInUser: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  currentPassword: PropTypes.string.isRequired,
  updatedUser: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired
};
Settings.defaultProps = {
  error: "",
  message: "",
  profile: {}
};
export const mapStateToProps = ({ user, auth }) => ({
  profile: user.profile,
  error: user.error,
  message: user.message,
  password: user.password,
  confirmPassword: user.confirmPassword,
  currentPassword: user.currentPassword,
  loggedInUser: auth.currentUser
});
export const mapDispatchToProps = dispatch => ({
  currentUser: username => dispatch(getCurrentUser(username)),
  updatedUser: data => dispatch(saveUpdatedUser(data)),
  onChangePassword: (data, username) =>
    dispatch(changePassword(data, username)),
  onInputChange: payload => dispatch(InputHandle(payload)),
  onDeleteProfile: username => dispatch(deleteProfile(username))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
