import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchCurrentUser as getCurrentUser,
  saveUpdatedUser,
  handleFormInput
} from "../redux/actions";
const usernameFromLocalStorage = "username";

class Settings extends Component {
  state = {
    passwordState: "",
    accountState: "active",
    emailState: ""
  };
  handleChangeClass = e => {
    if (e.target.name === "accountSettings") {
      this.setState({
        accountState: "active",
        passwordState: "",
        emailState: ""
      });
    }
    if (e.target.name === "emailSettings") {
      this.setState({
        emailState: "active",
        passwordState: "",
        accountState: ""
      });
    }
    if (e.target.name === "passwordSettings") {
      this.setState({
        passwordState: "active",
        accountState: "",
        emailState: ""
      });
    }
  };
  componentDidMount() {
    const { currentUser } = this.props;
    currentUser(usernameFromLocalStorage);
  }
  handleChange = () => {
    const {
      updatedUser,
      profile: { allowNotifications }
    } = this.props;
    updatedUser(
      { allowNotifications: !allowNotifications },
      usernameFromLocalStorage
    );
  };

  render() {
    const {
      profile: { allowNotifications }
    } = this.props;
    return (
      <div className="user-settings">
        <div className="col-md-6 col-av-8 col-sm-12">
          <div className="row" style={{ minHeight: "350px" }}>
            <div className="col-md-4 col-av-4 hide-sm">
              <h2 className="setting-title">Settings</h2>
              <ul className="settings-options">
                <li onClick={this.handleChangeClass}>
                  <a
                    href="#account-settings"
                    name="accountSettings"
                    className={this.state.accountState}
                  >
                    Account
                  </a>
                </li>
                <li onClick={this.handleChangeClass}>
                  <a
                    href="#password-settings"
                    name="passwordSettings"
                    className={this.state.passwordState}
                  >
                    Password
                  </a>
                </li>
                <li onClick={this.handleChangeClass}>
                  <a
                    href="#email-settings"
                    name="emailSettings"
                    className={this.state.emailState}
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-8 col-av-8 col-sm-12">
              <div className="settings-content">
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
                <section id="email-settings">
                  <h2 className="setting-title">Email Settings</h2>
                  <div className="notification-settings">
                    <h3>Allow email notification</h3>
                    <label className="notification-toggle">
                      <input
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
                <section id="account-settings">
                  <h2 className="setting-title">General Account Settings</h2>
                  <h3>Delete my account</h3>
                  <p>Permanently delete your account and all your content</p>
                  <a href="#account-settings" className="danger">
                    Delete
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  profile: state.user.profile,
  error: state.user.error,
  message: state.user.message
});

export const mapDispatchToProps = dispatch => ({
  currentUser: username => dispatch(getCurrentUser(username)),
  updatedUser: (data, username) => dispatch(saveUpdatedUser(data, username)),
  onInputChange: payload => dispatch(handleFormInput(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
