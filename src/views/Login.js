import React, { Component } from "react";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";
import BasicButton from "../components/common/Buttons/BasicButton";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmitting: false
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }
  handleTextInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    this.setState({
      isSubmitting: true
    });
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
                  <div className="icon">
                    <img
                      src={require("../assets/icons/fb-icon.svg")}
                      alt="fb"
                    />
                  </div>
                  <div className="icon">
                    <img
                      src={require("../assets/icons/twitter-icon.svg")}
                      alt="G"
                    />
                  </div>
                  <div className="icon">
                    <img
                      src={require("../assets/icons/google-plus-icon.svg")}
                      alt="G"
                    />
                  </div>
                </div>
                <p className="pg-title">Or</p>
                <form data-test="login-form">
                  <TextInput
                    type="email"
                    name="email"
                    id="auth-email"
                    placeholder="Email"
                    onChange={e => this.handleTextInput(e)}
                    value={this.state.email}
                  />
                  <TextInput
                    type="password"
                    name="password"
                    id="auth-password"
                    placeholder="Password"
                    onChange={e => this.handleTextInput(e)}
                    value={this.state.password}
                  />
                  <div className="">
                    <p className="password-reset" data-test="nav-link">
                      <a href="#">Forgot password?</a>
                    </p>
                  </div>
                  <FormButton
                    value="Sign In"
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
