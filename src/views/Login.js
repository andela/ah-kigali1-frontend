import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  handleTextInput,
  handleSignIn,
  socialAuth
} from "../redux/actions/loginActions";
import { isEmpty } from "../utils/helperFunctions";
import Validator from "../utils/validator";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";
import BasicButton from "../components/common/Buttons/BasicButton";
import SocialButton from "../components/common/Buttons/SocialButton";
import Logo from "../components/common/Logo";

export class Login extends Component {
  state = {
    errors: {}
  };

  handleOnChange = e => {
    this.setState({
      errors: {}
    });
    const { name, value } = e.target;
    const { handleTextInput: textInput } = this.props;
    textInput(name, value);
  };

  handleSubmit = () => {
    const { email, password, handleSignIn: signIn } = this.props;
    const errors = Validator.formData({ email, password });
    if (!isEmpty(errors)) {
      this.setState({
        errors: {
          ...errors
        }
      });
      return;
    }
    signIn({ email, password });
  };

  handleNavigation = path => <Redirect to={`/${path}`} />;

  handleSocialAuth(provider) {
    const { isSubmitting, socialAuth: socialLogin } = this.props;
    if (!isSubmitting) {
      socialLogin(provider);
    }
  }

  render() {
    const { email, password, message, isSubmitting, loginSuccess } = this.props;
    const { errors } = this.state;
    if (loginSuccess) {
      return this.handleNavigation("");
    }
    return (
      <div className="auth" data-test="login">
        <div className="row">
          <div className="col-md-6 hide-sm">
            <div className="auth-left" data-test="auth-left">
              <div className="logo">
                <Logo data-test="logo" />
              </div>
              <p>Join the community of like minded author, today!</p>
              <BasicButton
                className="btn btn-block"
                onClick={() => this.handleNavigation()}
                title="Sign Up"
                data-test="nav-link"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="auth-right" data-test="auth-right">
              <div className="auth-form">
                <div className="hide-md logo">
                  <Logo data-test="logo" />
                </div>
                <p className="pg-title">Sign in with</p>
                <div className="socials" data-test="socials">
                  <SocialButton
                    iconName="fb"
                    alt="fb"
                    onClick={() => this.handleSocialAuth("facebook")}
                  />
                  <SocialButton
                    iconName="twitter"
                    alt="twitter"
                    onClick={() => this.handleSocialAuth("twitter")}
                  />
                  <SocialButton
                    iconName="google-plus"
                    alt="G"
                    onClick={() => this.handleSocialAuth("google")}
                  />
                </div>
                <p className="pg-title">Or</p>
                <form data-test="login-form">
                  <TextInput
                    type="email"
                    name="email"
                    id="auth-email"
                    placeholder="Email"
                    onChange={e => this.handleOnChange(e)}
                    value={email}
                  />
                  <TextInput
                    type="password"
                    name="password"
                    id="auth-password"
                    placeholder="Password"
                    onChange={e => this.handleOnChange(e)}
                    value={password}
                  />
                  <div className="auth-errors">
                    <p className="danger">
                      {message || errors.email || errors.password}
                    </p>
                  </div>
                  <div className="">
                    <p className="password-reset" data-test="nav-link">
                      <Link to="/reset_password">Forgot password?</Link>
                    </p>
                  </div>
                  <FormButton
                    value="Sign In"
                    disabled={isSubmitting}
                    onClick={this.handleSubmit}
                  />
                </form>
                <div className="auth-link hide-md">
                  <p className="sign-up-link">
                    Don &apos; t have an account? <Link to="/">sign up</Link>.
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

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleTextInput: PropTypes.func.isRequired,
  message: PropTypes.string,
  loginSuccess: PropTypes.bool.isRequired,
  socialAuth: PropTypes.func.isRequired
};
Login.defaultProps = {
  message: ""
};
export const mapStateToProps = state => {
  const { login } = state;
  return {
    ...login,
    message: login.errors.message
  };
};

export default connect(
  mapStateToProps,
  { handleTextInput, handleSignIn, socialAuth }
)(Login);
