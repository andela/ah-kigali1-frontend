import "./loading.css";
import React from "react";

const Loading = () => {
  return <img className="loading" src={require("../assets/img/circle-loading.gif")} alt="loading"/>;
};

export default Loading;
