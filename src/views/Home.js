import { connect } from "react-redux";
import "@babel/polyfill";
import React, { Component } from "react";
import BasicButton from "../components/common/Buttons/BasicButton";
import Navbar from "../components/common/AppBars/navBar";

import Latest from "../components/common/Cards/latest";
import CategoryBar from "../components/common/AppBars/categoryBar";
import Demo from "../components/common/Dialog/Dialog";

const cats = [
  "TECH",
  "CULTURE",
  "FILM",
  "FASHION",
  "POLITICS",
  "FITNESS",
  "SCIENCE",
  "BUSINESS",
  "TRAVEL",
  "LEISURE",
  "FOOD"
];

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <CategoryBar catList={cats} onMoreClick={() => {}} onClick={() => {}} />
        <div style={{ margin: 3, marginTop: 120 }}>
          <h2 className="home-container">Hello world, from Titan-Devs</h2>
          <BasicButton
            style={{ width: "40%" }}
            title="Save"
            onClick={() => <p>Clicked</p>}
          />
        </div>
        <Demo />
        <div className="featured_article">
          <Latest />
        </div>
        <Latest />
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Home);
