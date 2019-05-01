import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainArticle from "../components/common/Cards/main";
import { fetchAllArticles } from "../redux/actions/readAllArticlesActions";
import Latest from "../components/common/Cards/latest";
import CategoryBar from "../components/common/AppBars/CategoryBar";

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

export class Home extends Component {
  state = {
    allArticles: []
  };

  componentDidMount = () => {
    const { fetchAllArticles: getArticles } = this.props;
    getArticles();
  };

  componentWillReceiveProps = ({ allArticles }) => {
    const { allArticles: existing } = this.props;
    if (allArticles !== existing) {
      return this.setState({ allArticles });
    }
  };

  render() {
    const { allArticles } = this.state;
    return (
      <div>
        <CategoryBar catList={cats} onMoreClick={() => {}} onClick={() => {}} />
        <div className="article_header">
          <h2 className="featured_article_title">Featured Articles</h2>
        </div>
        <div className="featured_article">
          <div className="left">
            {allArticles.length ? (
              <MainArticle article={allArticles[0]} />
            ) : (
              false
            )}
          </div>
          <div className="right">
            <div className="top">
              {allArticles.length ? (
                <MainArticle article={allArticles[1]} />
              ) : (
                false
              )}
            </div>
            <div className="down">
              {allArticles.length ? (
                <MainArticle article={allArticles[2]} />
              ) : (
                false
              )}
            </div>
          </div>
        </div>

        <div className="popular_latest_article">
          <div className="article_header_left">
            <div className="latest_article_title">
              <h2>Latest Articles</h2>
            </div>

            <div>
              {allArticles.map(newArticle => (
                <div className="latest_article_content" key={newArticle.id}>
                  <Latest article={newArticle} />
                </div>
              ))}
            </div>
          </div>
          <div className="article_header_right">
            <div className="popular_article_title">
              <h2>Popular Articles</h2>
            </div>
            <div>
              {allArticles.map(newArticle => (
                <div className="popular_article_content" key={newArticle.id}>
                  <MainArticle article={newArticle} />{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  fetchAllArticles: PropTypes.func.isRequired,
  allArticles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const mapStateToProps = state => ({ ...state.allArticles });

export default connect(
  mapStateToProps,
  { fetchAllArticles }
)(Home);
