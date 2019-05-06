import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { values } from "lodash";
import BasicButton from "../components/common/Buttons/BasicButton";
import Input from "../components/common/Inputs/TextInput";
import {
  handleInputChange,
  fetchResults,
  clearSearchResults
} from "../redux/actions/searchActions";
import {
  calculateTimeStamp,
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
    articles: {},
    authors: {},
    pageNumber: 1,
    activeTag: null,
    tagsList: []
  };

  componentWillMount() {
    const {
      history: { location },
      fetchResults: getAllArticles,
      articles
    } = this.props;
    const { keyword } = queryString.parse(location.search);
    this.handleOnChange(keyword);
    if (isEmpty(articles)) getAllArticles(keyword, 1);
  }

  componentDidMount() {
    document.addEventListener("scroll", () => this.handleScroll(), true);
  }

  componentWillReceiveProps(nextProps) {
    const { articles, authors } = nextProps;
    this.setState(state => ({
      articles: { ...state.article, ...articles },
      authors: { ...state.author, ...authors },
      tagsList: getTags(articles)
    }));
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
    const { searchQuery, isLoading, errors } = this.props;
    if (isBottom() && !isLoading && isEmpty(errors)) {
      this.setState(state => ({
        pageNumber: state.pageNumber + 1
      }));
      this.searchArticle(searchQuery);
    }
  };

  searchArticle = searchQuery => {
    const { fetchResults: getResults, history, pageNumber } = {
      ...this.props,
      ...this.state
    };
    getResults(searchQuery, pageNumber, history);
  };

  handleTagFilter = (tag, index) => {
    const { articles } = this.props;
    const { activeTag } = this.state;
    if (index === activeTag) {
      return this.setState({
        activeTag: null,
        articles
      });
    }
    this.setState({
      articles: filterByTag(articles, tag),
      activeTag: index
    });
  };

  renderTags = (tagsList, activeTag) => (
    <div>
      <h2>#Tags</h2>
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
    </div>
  );

  renderAuthors = authors => {
    const authorsArr = values(authors);
    return (
      <div>
        <h2>Authors</h2>
        <div className="authors-section">
          {authorsArr.map(author => (
            <div key={author.id}>
              <AuthorCard {...author} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderArticles = (articles, isLoading, errors, activeTag) => (
    <section id="articles" className="active">
      {values(articles).map(article => (
        <div className="col-md-12" key={article.id}>
          <Card
            title={article.title}
            description={article.description}
            comments={article.comments.length}
            likes={article.likes.length}
            author={article.author}
            readTime={article.readTime}
            createdAt={calculateTimeStamp(article.createdAt)}
            slug={article.slug}
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
  );

  render() {
    const {
      searchQuery,
      isLoading,
      errors,
      articles,
      authors,
      activeTag,
      tagsList
    } = { ...this.props, ...this.state };

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
            {isEmpty(articles) && !isLoading ? (
              <p className="no-results">We couldn’t find any articles.</p>
            ) : (
              this.renderArticles(articles, isLoading, errors, activeTag)
            )}
          </div>
        </div>

        <div className="right-side hide-sm">
          {!isEmpty(tagsList) && this.renderTags(tagsList, activeTag)}
          {!isEmpty(authors) && this.renderAuthors(authors)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.search });
SearchResults.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  fetchResults: PropTypes.func.isRequired,
  articles: PropTypes.shape({}).isRequired,
  authors: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      search: PropTypes.string
    })
  }).isRequired
};

export default connect(
  mapStateToProps,
  { handleInputChange, fetchResults, clearSearchResults }
)(SearchResults);
