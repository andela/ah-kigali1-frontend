import React, { Component } from "react";
import BasicButton from "../components/common/Buttons/BasicButton";
import Input from "../components/common/Inputs/TextInput";
import MainCard from "../components/common/Cards/main";
import CategoryBar from "../components/common/AppBars/CategoryBar";
import Latest from "../components/common/Cards/latest";

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
        <h2>Hello home</h2>
      </div>
    );
  }
}

export default Home;
