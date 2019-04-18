import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";
import {
  handleInputChange,
  handleUpdatePassword
} from "../redux/actions/updatePasswordActions";

import Validator from "../utils/validator";
import { isEmpty, parseURL } from "../utils/helperFunctions";

export class UpdatePassword extends Component {
  state = {
    token: "",
    errors: {}
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const token = parseURL("?token=", search);
    this.setToken(token);
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    this.setState({
      errors
    });
  }

  setToken = token => {
    this.setState({ token });
  };

  handleOnChange = e => {
    const { value, name } = e.target;
    const { handleInputChange: onChangeAction } = this.props;
    onChangeAction(name, value);
  };

  handleSubmit = () => {
    const {
      password,
      confirmPassword,
      handleUpdatePassword: updatePasswordAction
    } = this.props;
    const { token } = this.state;
    const errors = {
      ...Validator.formData({ password, confirmPassword }),
      ...Validator.isMatch("password", password, confirmPassword)
    };
    if (isEmpty(errors)) {
      return updatePasswordAction({ token, password });
    }
    this.setState({
      errors
    });
  };

  handleNavigation = path => <Redirect to={`/${path}`} />;

  render() {
    const {
      password,
      confirmPassword,
      isSubmitting,
      passwordUpdateSuccess
    } = this.props;
    const { errors } = this.state;
    if (passwordUpdateSuccess) {
      return this.handleNavigation("sign_in");
    }
    return (
      <div className="reset-password__container">
        <div className="reset-password">
          <div className="reset-password__header">
            <img
              src={require("../assets/img/main-logo.svg")}
              alt="logo"
              className="logo"
            />

            <div>
              <h2>Update Password</h2>
              <p>
                To update, please provide your new strong password and confirm
                it.
              </p>
              <form action="#" className="reset-password__form">
                <TextInput
                  type="password"
                  name="password"
                  placeholder="New Password"
                  onChange={e => this.handleOnChange(e)}
                  value={password}
                />
                <TextInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={e => this.handleOnChange(e)}
                  value={confirmPassword}
                />
                <div className="auth-errors">
                  <p className="danger">
                    {errors.password ||
                      errors.confirmPassword ||
                      errors.message}
                  </p>
                </div>
                <FormButton
                  value="Submit"
                  disabled={isSubmitting}
                  onClick={() => this.handleSubmit()}
                />
              </form>
            </div>
          </div>
          <div className="reset-password__footer">
            <p>
              Don &apos;t have an account?
              <Link to="/sign_up">sign up now!</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { updatePassword } = state;
  return {
    ...updatePassword
  };
};
UpdatePassword.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  passwordUpdateSuccess: PropTypes.bool.isRequired
};
export default connect(
  mapStateToProps,
  { handleInputChange, handleUpdatePassword }
)(UpdatePassword);
