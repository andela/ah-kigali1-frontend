import React, { Component } from "react";
import { connect } from "react-redux";
import { handleTextInput, handleSignIn } from "../redux/actions/loginActions";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";
import BasicButton from "../components/common/Buttons/BasicButton";
import ButtonIcon from "../components/common/Socials/ButtonIcon";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    this.props.handleTextInput(name, value);
  }

  handleSubmit() {
    const { email, password } = this.props;
    this.props.handleSignIn({ email, password });
  }

  handleNavigation() {
    return null;
  }

  render() {
    return (
      <div className="auth" data-test="login">
        <div className="row">
          <div className="col-md-6 hide-sm">
            <div className="auth-left" data-test="auth-left">
              <div className="logo">
                <img
                  src={require("../assets/img/quill-drawing-a-line.svg")}
                  alt="logo"
                  className="logo"
                  data-test="logo"
                />
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
                  <img
                    src={require("../assets/img/quill-drawing-a-line.svg")}
                    alt="logo"
                    className="logo"
                    data-test="logo"
                  />
                </div>
                <p className="pg-title">Sign in with</p>
                <div className="socials" data-test="socials">
                  <ButtonIcon name="fb" alt="fb" />
                  <ButtonIcon name="twitter" alt="twitter" />
                  <ButtonIcon name="google-plus" alt="G" />
                </div>
                <p className="pg-title">Or</p>
                <form data-test="login-form">
                  <TextInput
                    type="email"
                    name="email"
                    id="auth-email"
                    placeholder="Email"
                    onChange={e => this.handleOnChange(e)}
                    value={this.props.email}
                  />
                  <TextInput
                    type="password"
                    name="password"
                    id="auth-password"
                    placeholder="Password"
                    onChange={e => this.handleOnChange(e)}
                    value={this.props.password}
                  />
                  <div className="auth-errors">
                    <p className="danger">{this.props.errors.message}</p>
                  </div>
                  <div className="">
                    <p className="password-reset" data-test="nav-link">
                      <a href="#">Forgot password?</a>
                    </p>
                  </div>
                  <FormButton
                    value="Sign In"
                    disabled={this.props.isSubmitting}
                    onClick={() => this.handleSubmit()}
                  />
                </form>
                <div className="auth-link hide-md">
                  <p className="sign-up-link">
                    Don't have an account? <a href="./sign-up.html">sign up</a>.
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

const mapStateToProps = state => {
  const { login } = state;
  return {
    ...login
  };
};

export default connect(
  mapStateToProps,
  { handleTextInput, handleSignIn }
)(Login);
