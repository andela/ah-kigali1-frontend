import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import Confirm from "../components/common/Buttons/confirm";
import Input from "../components/common/Inputs/input";
import Navbar from "../components/common/navbar";
import MainCard from "../components/common/Cards/main";
import Latest from "../components/common/Cards/latest";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ margin: 3 }}>
          <h2 className="home-container">Hello world, from Titan-Devs</h2>
          <Confirm
            style={{ width: "40%" }}
            title="Save"
            onClick={() => console.log("button clicked")}
          />
          <Input
            style={{ width: "40%" }}
            type="email"
            placeholder="Your email"
          />
          <Input
            style={{ width: "60%" }}
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="featured_article">
          <MainCard />
          <Latest />
        </div>
        <Latest />
      </div>
    );
  }
}

const mapStateToProps = state => ({ articles: state.articles });

export default connect(mapStateToProps)(Home);
