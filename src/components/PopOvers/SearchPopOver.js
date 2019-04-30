import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

const SearchPopOver = ({ searchQuery, articles }) => (
  <div id="popover">
    <div className="popover-inner" style={{ height: "260px" }}>
      <div className="header">
        <Link to="/search?keyword=hello world">
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
          <Link to="/search?keyword=hello world">
            <h2>More</h2>
          </Link>
        </div>
      </header>
      <ul className="popover-content" style={{ maxHeight: "250px" }}>
        {[..._.values(articles)].map(item => (
          <li className="list-item" key={item.id}>
            <Link to={`/articles/${item.slug}`} className="link">
              <img
                src="https://cdn-images-1.medium.com/fit/c/64/64/1*0VWnJCXj9U5XkwRp85Mfwg.png"
                className="avatar"
                alt="Hello World"
              />
              <span className="avatar-text">{item.title}</span>
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
