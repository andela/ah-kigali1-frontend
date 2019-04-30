/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import _ from "lodash";
import BasicButton from "../components/common/Buttons/BasicButton";
import Input from "../components/common/Inputs/TextInput";
import {
  handleInputChange,
  fetchResults,
  clearSearchResults
} from "../redux/actions/searchActions";
import {
  toReadableDate,
  filterByTag,
  getTags,
  isEmpty,
  isBottom
} from "../utils/helperFunctions";
import Card from "../components/common/Cards/AnimatedCard";
import AuthorCard from "../components/common/Cards/AuthorCard";
import Loading from "../components/Animations/LoadingDots";

export class SearchResults extends Component {
  state = {
    articles: [],
    authors: [],
    pageNumber: 1,
    activeTag: null,
    tagsList: []
  };

  componentWillMount() {
    const { location, fetchResults: getAllArticles, articles } = this.props;
    const { keyword } = queryString.parse(location.search);
    this.handleOnChange(keyword);
    if (isEmpty(articles)) getAllArticles(keyword, 1);
  }

  componentDidMount() {
    document.addEventListener("scroll", () => this.handleScroll(), true);
  }

  componentWillReceiveProps(nextProps) {
    const { articles, authors } = nextProps;
    this.setState({
      articles: _.values(articles),
      authors: _.values(authors),
      tagsList: getTags(articles)
    });
  }

  componentWillUnmount() {
    const { clearSearchResults: clear } = this.props;
    clear();
  }

  handleOnChange = value => {
    const { handleInputChange: setSearchQuery } = this.props;
    setSearchQuery(value);
  };

  handleEnterPress = e => {
    const { isLoading, searchQuery } = this.props;
    if (isLoading || isEmpty(searchQuery)) {
      return;
    }
    this.setState({
      pageNumber: 1
    });
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.searchArticle(searchQuery);
    }
  };

  handleScroll = () => {
    console.log("***************", "scrolling");
    const { searchQuery, isLoading } = this.props;
    if (isBottom() && !isLoading) {
      this.setState(state => ({
        pageNumber: state.pageNumber + 1
      }));
      setTimeout(this.searchArticle(searchQuery), 3000);
    }
  };

  searchArticle = searchQuery => {
    const { fetchResults: getResults } = this.props;
    const { pageNumber } = this.state;
    getResults(searchQuery, pageNumber);
  };

  handleTagFilter = (tag, index) => {
    const { articles } = this.props;
    const { activeTag } = this.state;
    if (index === activeTag) {
      return this.setState({
        activeTag: null,
        articles: _.values(articles)
      });
    }
    this.setState({
      articles: filterByTag(_.values(articles), tag),
      activeTag: index
    });
  };

  render() {
    const { searchQuery, isLoading, errors } = this.props;
    const { articles, authors, activeTag, tagsList } = this.state;
    return (
      <div className="search-results">
        <div className="left-side">
          <div className="search-query">
            <Input
              type="search"
              name="search"
              placeholder=""
              className="search-input"
              onChange={e => this.handleOnChange(e.target.value)}
              value={searchQuery}
              onKeyDown={e => this.handleEnterPress(e)}
            />
          </div>
          <div className="results" id="results-container">
            <section id="articles" className="active">
              {articles.map(article => (
                <div className="col-md-12" key={article.id}>
                  <Card
                    title={article.title}
                    description={article.description}
                    comments={article.comments.length}
                    likes={article.likes.length}
                    author={article.author}
                    readTime={article.readTime}
                    createdAt={toReadableDate(article.createdAt)}
                  />
                </div>
              ))}
              <div className="loading-anim">
                {isLoading ? (
                  <Loading />
                ) : (
                  !isEmpty(errors.message) &&
                  !activeTag && <small>{errors.message}</small>
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="right-side hide-sm">
          {tagsList.length !== 0 && <h2>#Tags</h2>}
          <div className="tags-section">
            {tagsList.map((title, index) => (
              <BasicButton
                className={`tags ${activeTag === index ? "active" : ""}`}
                title={title}
                key={`${index + 1}`}
                onClick={() => this.handleTagFilter(title, index)}
                data-test="single-tag"
              />
            ))}
          </div>
          {authors.length !== 0 && <h2>Authors</h2>}
          <div className="authors-section">
            {authors.map(author => (
              <AuthorCard {...author} key={author.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { search } = state;
  return {
    ...search
  };
};
SearchResults.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  fetchResults: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearSearchResults: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { handleInputChange, fetchResults, clearSearchResults }
)(SearchResults);
