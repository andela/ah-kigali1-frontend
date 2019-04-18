import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleUserLogin } from "../redux/actions/socialAuthActions";
import { parseURL } from "../utils/helperFunctions";

export class SocialAuth extends Component {
  componentWillMount() {
    const {
      location: { search },
      handleUserLogin: loginUser
    } = this.props;
    const token = parseURL("?token=", search);
    loginUser(token);
  }

  handleSuccess = () => <Redirect to="/" />;

  handleFailure = () => <Redirect to="/sign_in" />;

  render() {
    const { isSubmitting, socialAuthFailed, socialAuthSuccess } = this.props;

    if (isSubmitting) {
      return (
        <div>
          <h3>Loading.......</h3>
        </div>
      );
    }

    if (socialAuthFailed) {
      return this.handleFailure();
    }
    if (socialAuthSuccess) {
      return this.handleSuccess();
    }
  }
}
SocialAuth.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  handleUserLogin: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  socialAuthSuccess: PropTypes.bool.isRequired,
  socialAuthFailed: PropTypes.bool.isRequired
};
const mapStateToProps = state => {
  const { socialAuth } = state;
  return {
    ...socialAuth
  };
};
export default connect(
  mapStateToProps,
  { handleUserLogin }
)(SocialAuth);
