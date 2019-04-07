import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import addArticle from "../redux/actions/index";
// import "../index.css";

const mapDispatchToProps = dispatch => ({
  addArticle: () => dispatch(addArticle())
});

const FetchedArticles = props => (
  <div>
    <h1>Fetch some articles from dummy app</h1>

    <button
      // eslint-disable-next-line react/destructuring-assignment
      onClick={() => props.addArticle()}
      className="btn"
      type="submit"
    >
      Fetch more articles
    </button>
  </div>
);

FetchedArticles.propTypes = {
  // eslint-disable-next-line react/require-default-props
  addArticle: PropTypes.func
};

const Articles = connect(
  null,
  mapDispatchToProps
)(FetchedArticles);

export default Articles;
