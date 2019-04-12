import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  handleInputChange,
  sendResetLink
} from "../redux/actions/resetPasswordActions";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    const { handleInputChange: handleChange } = this.props;
    handleChange(name, value);
  }

  handleSubmit() {
    const { email } = this.props;
    const { sendResetLink: handleReset } = this.props;
    handleReset({ email });
  }

  render() {
    const {
      email,
      failedMessage,
      isSubmitting,
      isSuccess,
      successMessage
    } = this.props;
    return (
      <div className="reset-password__container">
        <div className="reset-password">
          <div className="reset-password__header">
            <img
              src={require("../assets/img/main-logo.svg")}
              alt="logo"
              className="logo"
            />
            <h1>Author &apos;s Heaven</h1>
            {isSuccess ? (
              <div>
                <h2>Email sent!</h2>
                <p>{successMessage}</p>
              </div>
            ) : (
              <div>
                <h2>Reset password</h2>
                <p>
                  To reset your password, please provide your Author’s Heaven
                  email.
                </p>
                <form action="#" className="reset-password__form">
                  <TextInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleOnChange(e)}
                    value={email}
                  />
                  {failedMessage ? (
                    <div className="auth-errors">
                      <p className="danger">{failedMessage}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <FormButton
                    value="Sign In"
                    disabled={isSubmitting}
                    onClick={() => this.handleSubmit()}
                  />
                </form>
              </div>
            )}
          </div>
          <div className="reset-password__footer">
            <p>
              Don &apos;t have an account?
              <a href="/">sign up now!</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { resetPassword } = state;
  return {
    ...resetPassword
  };
};
ResetPassword.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  sendResetLink: PropTypes.func.isRequired,
  failedMessage: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  { handleInputChange, sendResetLink }
)(ResetPassword);
