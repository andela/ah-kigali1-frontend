import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInput from "../components/common/Inputs/TextInput";
import FormButton from "../components/common/Buttons/FormButton";
import {
  handleInputChange,
  handleUpdatePassword
} from "../redux/actions/updatePasswordActions";
import Validator from "../utils/validator";
import { isEmpty } from "../utils/helperFunctions";

export class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) {
      this.setState({
        errors
      });
    }
  }

  handleOnChange(e) {
    const { value, name } = e.target;
    const { handleInputChange: onChangeAction } = this.props;
    onChangeAction(name, value);
  }

  handleSubmit() {
    const {
      password,
      confirmPassword,
      handleUpdatePassword: submitNewPassword
    } = this.props;
    const errors = Validator.formData({ password, confirmPassword });
    if (!isEmpty(errors)) {
      return this.setState({
        errors
      });
    }
    if (password !== confirmPassword) {
      return this.setState({
        errors: {
          message: "Password miss match "
        }
      });
    }
    submitNewPassword(password);
  }

  render() {
    const { password, confirmPassword, isSubmitting } = this.props;
    const { errors } = this.state;
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
                  value="Sign In"
                  disabled={isSubmitting}
                  onClick={() => this.handleSubmit()}
                />
              </form>
            </div>
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
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { handleInputChange, handleUpdatePassword }
)(UpdatePassword);
