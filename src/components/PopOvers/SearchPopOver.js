import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { values } from "lodash";
import NoImg from "../../assets/img/no-thumbnail.png";

const SearchPopOver = ({ searchQuery, articles }) => (
  <div id="search-popover">
    <div className="popover-inner">
      <div className="header">
        <Link to={`/search?keyword=${searchQuery}`}>
          <span className="button">
            <span className="search-icon" />
          </span>
          <span>Search for {searchQuery}</span>
        </Link>
      </div>
      <header className="suggestion-header">
        <div className="header-left">
          <h2>Articles</h2>
        </div>
        <div className="header-right">
          <Link to={`/search?keyword=${searchQuery}`}>
            <h2>More</h2>
          </Link>
        </div>
      </header>
      <ul className="popover-content">
        {[...values(articles)].map(item => (
          <li className="list-item" key={item.id}>
            <Link to={`/articles/${item.slug}`} className="link">
              <img src={item.img || NoImg} alt="img" className="avatar" />
              <div className="article-author">
                <span className="article-title">{item.title}</span>
                <div className="add-info">
                  <p>@{item.author.username}</p>
                  <p>{item.readTime} min read</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="popover-arrow" />
  </div>
);
SearchPopOver.propTypes = {
  searchQuery: PropTypes.string,
  articles: PropTypes.shape({}).isRequired
};
SearchPopOver.defaultProps = {
  searchQuery: ""
};
export default SearchPopOver;
