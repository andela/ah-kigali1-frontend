import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleRegistration,
  handleInputChange,
  handleBlur
} from "../redux/actions/registrationActions";
import TextInput from "../components/common/Inputs/TextInput";
import checkField from "../utils/checkField";
import FormButton from "../components/common/Buttons/FormButton";
import SocialButton from "../components/common/Buttons/SocialButton";
import BasicButton from "../components/common/Buttons/BasicButton";
import AuthMessage from "../components/common/Message/authError";
import Logo from "../components/common/Logo";

export class SignUp extends Component {
  handleChange = event => {
    event.stopPropagation();
    const { name, value } = event.target;
    const { InputChange } = this.props;
    InputChange(name, value);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { register, user, message } = this.props;
    if (!message) {
      register(user);
    }
  };

  handleBlur = event => {
    event.preventDefault();
    const { name, value } = event.target;
    const { blur } = this.props;
    blur(name, value);
  };

  render() {
    const { message, user, submitted, success, history } = this.props;
    if (success) {
      history.push("/home");
    }
    return (
      <div className="auth">
        <div className="row">
          <div className="col-md-6 hide-sm">
            <div className="auth-left">
              <div className="logo">
                <Logo data-test="logo" />
              </div>
              <p>Welcome to the community of like minded author!</p>
              <BasicButton
                className="btn btn-block"
                onClick={() => {
                  history.push("/sign_in");
                }}
                title="Sign In"
                data-test="nav-link"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="auth-right">
              <div className="auth-form">
                <div className="hide-md logo">
                  <Logo data-test="logo" />
                </div>
                <p className="pg-title">Sign up with</p>
                <div className="socials" data-test="socials">
                  <SocialButton iconName="fb" alt="fb" />
                  <SocialButton iconName="twitter" alt="twitter" />
                  <SocialButton iconName="google-plus" alt="G" />
                </div>
                <p className="pg-title">Or</p>
                <form>
                  <TextInput
                    type="text"
                    name="username"
                    id="auth-username"
                    placeholder="Username"
                    value={user.username}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {checkField(message, "username") ? (
                    <AuthMessage message={message} />
                  ) : (
                    ""
                  )}

                  <TextInput
                    type="email"
                    name="email"
                    id="auth-email"
                    placeholder="Email"
                    value={user.email}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {checkField(message, "email") ? (
                    <AuthMessage message={message} />
                  ) : (
                    ""
                  )}
                  <TextInput
                    type="password"
                    name="password"
                    id="auth-password"
                    placeholder="Password"
                    value={user.password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  {checkField(message, "password") ? (
                    <AuthMessage message={message} />
                  ) : (
                    ""
                  )}
                  <FormButton
                    value="Sign Up"
                    disabled={submitted}
                    onClick={this.handleSubmit}
                    type="button"
                  />
                </form>
                <div className="auth-link ">
                  <p className="sign-up-link">
                    Already have an account? <Link to="/sign_in">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.any.isRequired,
  InputChange: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
  submitted: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  InputChange: (name, value) => dispatch(handleInputChange(name, value)),
  register: user => dispatch(handleRegistration(user)),
  blur: (name, value) => dispatch(handleBlur(name, value))
});

export const mapStateToProps = state => {
  const { registration } = state;
  return registration;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
