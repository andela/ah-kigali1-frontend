import { connect } from "react-redux";
import React, { Component } from "react";
import BasicButton from "../components/common/Buttons/BasicButton";
import Input from "../components/common/Inputs/TextInput";
import Navbar from "../components/common/AppBars/navBar";
import MainCard from "../components/common/Cards/main";
import Latest from "../components/common/Cards/latest";
import CategoryBar from "../components/common/AppBars/categoryBar";

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
          <BasicButton style={{ width: "40%" }} title="Save" />
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
