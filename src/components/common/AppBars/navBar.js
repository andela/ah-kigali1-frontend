import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logo from "../../../assets/img/quill-drawing-a-line.svg";
import UserIcon from "../../../assets/img/user.jpg";
import Logo from "../../../assets/img/quill-drawing-a-line.svg";

import TextInput from "../Inputs/TextInput";
import {
  fetchResults,
  authSuggestArticles
} from "../../../redux/actions/searchActions";
import { isEmpty } from "../../../utils/helperFunctions";
import SearchPopOver from "../../PopOvers/SearchPopOver";

export class Navbar extends Component {
  state = {
    toggle: "none",
    popOverOpen: false,
    searchQuery: ""
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.closeSearchPopOver);
  }

  setSearchPopOverRef = node => {
    this.searchPopOverRef = node;
  };

  handleEnterPress = e => {
    const { searchQuery, fetchResults: searchArticles, history } = this.props;
    if (isEmpty(searchQuery)) {
      return;
    }
    if (e.keyCode === 13 && e.shiftKey === false) {
      searchArticles(searchQuery, 1, history);
    }
  };

  closeSearchPopOver = e => {
    if (this.searchPopOverRef && !this.searchPopOverRef.contains(e.target)) {
      this.setState({
        popOverOpen: false
      });
    }
  };

  handleOnChange = value => {
    clearTimeout(this.timeOut);
    const { authSuggestArticles: getSuggestions } = this.props;
    this.setState({
      popOverOpen: true,
      searchQuery: value
    });
    this.timeOut = setTimeout(() => getSuggestions(value), 1000);
  };

  toggleOptions = () => {
    this.setState(state => ({
      toggle: state.toggle === "none" ? "block" : "none"
    }));
  };

  render() {
    const { toggle } = this.state;
    const token = localStorage.getItem("token");

    if (!token) {
      return <React.Fragment />;
    }
    const { toggle, popOverOpen, searchQuery } = this.state;
    const { history, suggestedArticles } = this.props;
    return (
      <div>
        <section
          style={{ margin: 0, boxSizing: "border-box", padding: 0 }}
          className="nav-bar"
        >
          <div className="nav-container" data-test="nav-container">
            <Link className="col-md-6 col-sm-3 brand-name" to="/">
              <div className="brand">
                <img src={Logo} alt="logo" className="brand" />
              </div>
              <h3>AH</h3>
            </Link>

            <div className="col-md-6 col-sm-12 user-actions">
              <div className="search-filed">
                {history.location.pathname !== "/search" && (
                  <TextInput
                    type="search"
                    name="search"
                    placeholder="Search...."
                    onChange={e => this.handleOnChange(e.target.value)}
                    value={searchQuery}
                    onKeyDown={e => this.handleEnterPress(e)}
                    id="nav-search-input"
                    className={popOverOpen ? "active" : ""}
                  />
                )}
              </div>
              <div className="other-actions">
                <div className="menu-container hide-md" />
                <button
                  type="button"
                  className="current-user hide-sm"
                  onClick={() => this.toggleOptions()}
                  id="user-dropdown"
                >
                  <img src={UserIcon} alt="user" className="user-avatar" />
                  <div className="user-name">
                    <p>John Doe</p>
                  </div>
                </button>
                <div className="drop-down" style={{ display: toggle }}>
                  <div className="up-arrow" />
                  <div className="drop-down-content">
                    <ul className="links">
                      <li className="nav-link">
                        <Link to="/articles/new" className="main">
                          New Story
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/stats">Stats</Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li>
                        <Link to="/sign_in">Sign out</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {history.location.pathname !== "/search" &&
          popOverOpen &&
          !isEmpty(suggestedArticles) && (
            <div ref={this.setSearchPopOverRef}>
              <SearchPopOver
                searchQuery={searchQuery}
                articles={suggestedArticles}
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser
});

const mapStateToProps = state => {
  const { search } = state;
  return {
    ...search
  };
};

Navbar.propTypes = {
  authSuggestArticles: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  suggestedArticles: PropTypes.shape({})
};
Navbar.defaultProps = {
  searchQuery: "",
  suggestedArticles: {}
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchResults, authSuggestArticles }
  )(Navbar)
);
