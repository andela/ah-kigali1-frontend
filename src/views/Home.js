import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MainArticle, { MainCard } from "../components/common/Cards/main";
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
            {allArticles.length > 0 && <MainCard article={allArticles[0]} />}
          </div>
          <div className="right">
            <div className="top">
              {allArticles.length > 1 && <MainCard article={allArticles[1]} />}
            </div>
            <div className="down">
              {allArticles.length > 2 && <MainCard article={allArticles[2]} />}
            </div>
          </div>
        </div>

        <div className="popular_latest_article">
          <div className="article_header_left">
            <div className="latest_article_title">
              <h2>Latest Articles</h2>
            </div>
            {allArticles.map(article => (
              <Latest article={article} key={article.id} />
            ))}
          </div>
          <div className="article_header_right">
            <div className="popular_article_title">
              <h2>Popular Articles</h2>
            </div>
            {allArticles
              .filter(
                item =>
                  item.likeCount > 5 ||
                  (item.comments && item.comments.length > 5)
              )
              .map(article => (
                <div className="popular_article_content">
                  <MainArticle article={article} key={article.id} />
                </div>
              ))}
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
