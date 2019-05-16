import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/**
 * function that check if the user is authenticated before doing any action
 * if not redirect him to log in page
 * @param  take props object of a component with location and history keys
 *
 */

const checkAuth = ({ location: { pathname: currentUrl }, history }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return history.push(`/sign_in?next=${currentUrl}`);
  }
};

const checkAuthComponent = Component => {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      checkAuth(this.props);
    }

    render() {
      const token = localStorage.getItem("token");
      return <div>{token ? <Component {...this.props} /> : ""}</div>;
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.any.isRequired
  };
  return connect()(AuthenticatedComponent);
};

export { checkAuthComponent, checkAuth };
