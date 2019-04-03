import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import addArticle from "../redux/actions/index";
import "../index.css";

const mapDispatchToProps = dispatch => {
  return {
    addArticle: () => dispatch(addArticle())
  };
};

class FetchedArticles extends Component {
  constructor() {
    super();
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleFetch() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addArticle();
  }

  render() {
    return (
      <div>
        <h1>Fetch some articles from dummy app</h1>

        <button onClick={this.handleFetch} className="btn" type="submit">
          Fetch more articles
        </button>
      </div>
    );
  }
}

FetchedArticles.propTypes = {
  // eslint-disable-next-line react/require-default-props
  addArticle: PropTypes.func
};

const Articles = connect(
  null,
  mapDispatchToProps
)(FetchedArticles);

export default Articles;
