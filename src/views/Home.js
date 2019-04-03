import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../index.css";

const mapStateToProps = state => {
  return { articles: state.articles };
};

const connectedArticles = ({ articles }) => (
  <div>
    {articles.map(article => (
      <div key={article.id} className="container">
        <h4>{article.title}</h4>
        <p>
          <span>{article.id}</span>
          {article.body}
        </p>
      </div>
    ))}
  </div>
);

connectedArticles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    })
  ).isRequired
};

const Home = connect(mapStateToProps)(connectedArticles);

export default Home;
