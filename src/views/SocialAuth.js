import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleUserLogin } from "../redux/actions/socialAuthCations";
import { parseURL } from "../utils/helperFunctions";

class SocialAuth extends Component {
  componentWillMount() {
    const {
      location: { search },
      handleUserLogin: loginUser
    } = this.props;
    const token = parseURL("?token=", search);
    loginUser(token);
  }

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
      return <Redirect to="/sign_In" />;
    }
    if (socialAuthSuccess) {
      return <Redirect to="/" />;
    }
  }
}
SocialAuth.propTypes = {
  location: PropTypes.object.isRequired,
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
