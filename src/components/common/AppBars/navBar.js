import React, { Component } from "react";
/* eslint global-require: "off" */

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "none"
    };
  }

  toggleOptions() {
    this.setState(state => ({
      toggle: state.toggle === "none" ? "block" : "none"
    }));
  }

  render() {
    const { toggle } = this.state;
    return (
      <div>
        <section
          style={{ margin: 0, boxSizing: "border-box", padding: 0 }}
          className="nav-bar"
        >
          <div className="nav-container">
            <div className="col-md-6 col-sm-3 brand-name">
              <div className="brand">
                <img
                  src={require("../../../assets/img/quill-drawing-a-line.svg")}
                  alt="logo"
                  className="brand"
                />
              </div>
              <h3>AH</h3>
            </div>
            <div className="col-md-6 col-sm-9 user-actions">
              <div className="search-filed">
                <input type="search" name="search" placeholder="Search....." />
              </div>
              <div className="other-actions">
                {/* don't delete please, these are the code if user is not logged in   */}
                {/* <div className="auth-actions">
                  <div className="sign-up hide-sm">
                    <a href="./sign-up.html">Sign up today!</a>
                  </div>
                  <div className="sign-in hide-sm">
                    <a href="./sign-in.html" className="btn">
                      Sign in
                    </a>
                  </div>
                </div> */}
                <div className="menu-container hide-md">
                  {/* <button className="menu-btn" id="menu-dropdown">
                    <img
                      src={require("../../../assets/img/menu-button.svg")}
                      alt="menu"
                      className="menu"
                    />
                  </button> */}
                </div>
                <button
                  type="button"
                  className="current-user hide-sm"
                  onClick={() => this.toggleOptions()}
                  id="user-dropdown"
                >
                  <img
                    src={require("../../../assets/img/user.jpg")}
                    alt="user"
                    className="user-avatar"
                  />
                  <div className="user-name">
                    <p>John Doe</p>
                  </div>
                </button>
                <div className="drop-down" style={{ display: toggle }}>
                  <div className="up-arrow" />
                  <div className="drop-down-content">
                    <ul className="links">
                      <li className="nav-link">
                        <a href="./new-article.html" className="main">
                          New Story
                        </a>
                      </li>
                      <li>
                        <a href="./profile.html">Profile</a>
                      </li>
                      <li>
                        <a href="./authors-performance.html">Stats</a>
                      </li>
                      <li>
                        <a href="./user-settings.html#password-settings">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="./sign-in.html">Sign out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Navbar;
