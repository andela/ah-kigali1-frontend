import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BookmarkComponent from "../components/common/Bookmarks";
import bookmarkIcon from "../assets/img/bookmark-icons.svg";
import bookmarkedIcon from "../assets/img/bookmarked.svg";
import { handleBookmark } from "../redux/actions/bookmarkActions";

export class Bookmark extends Component {
  static chooseBookmarkIcon(condition) {
    return condition ? bookmarkedIcon : bookmarkIcon;
  }

  render() {
    const {
      bookmark,
      isBookmarked,
      slug,
      isSubmitting,
      bookmarkedArticles,
      location,
      history
    } = this.props;
    if (!Object.prototype.hasOwnProperty.call(bookmarkedArticles, slug)) {
      Object.assign(bookmarkedArticles, { [slug]: isBookmarked });
    }
    const theBookmarkIcon = Bookmark.chooseBookmarkIcon(
      bookmarkedArticles[slug]
    );
    return (
      <BookmarkComponent
        onClick={() =>
          bookmark(slug, bookmarkedArticles[slug], { location, history })
        }
        icon={theBookmarkIcon}
        disabled={isSubmitting}
      />
    );
  }
}

export const mapStateToProps = state => ({
  ...state.bookmark
});

export const mapDispatchToProps = dispatch => ({
  bookmark: (slug, isBookmarked, { history, location }) =>
    dispatch(handleBookmark(slug, isBookmarked, { history, location }))
});

Bookmark.propTypes = {
  bookmark: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  bookmarkedArticles: PropTypes.shape({}).isRequired,
  slug: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  location: PropTypes.shape([]).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bookmark)
);
