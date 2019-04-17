import React, { Component } from "react";
// import PropTypes from "prop-types";
import LikeComponent from "../components/common/LikeComponent";

class Article extends Component {
  render() {
    return (
      <div>
        {" "}
        <LikeComponent onClick={() => this.handleOnClick()} likeCount={3} />
      </div>
    );
  }
}

Article.propTypes = {};

export default Article;
