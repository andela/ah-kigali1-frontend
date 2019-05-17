import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";
import Rate from "../Buttons/RatingButton";

export default class RatingForm extends Component {
  state = {
    openRatingForm: false,
    slug: "",
    rating: 0
  };

  componentDidMount = () => {
    const { slug, fetchRatings } = this.props;
    this.setState({ slug });
    fetchRatings(slug);
  };

  componentWillReceiveProps = nextProps => {
    const { slug, fetchRatings } = this.props;
    if (nextProps.slug !== slug) {
      this.setState({ openRatingForm: false, slug: nextProps.slug });
      fetchRatings(nextProps.slug);
    }
  };

  onStarClick = nextValue => {
    this.setState({ rating: nextValue });
    setTimeout(() => {
      this.setState({ openRatingForm: false, rating: 0 });
    }, 1000);
    this.handleRateArticle(nextValue);
  };

  toggleShowRatingForm = () => {
    const { openRatingForm } = this.state;
    if (openRatingForm) {
      return this.setState({ openRatingForm: false });
    }
    this.setState({ openRatingForm: true });
  };

  handleRateArticle = rate => {
    const { slug } = this.state;
    const { rateArticle, fetchRatings } = this.props;
    rateArticle(slug, rate).then(() => {
      fetchRatings(slug);
    });
  };

  renderRatingNumber = ratings => {
    if (ratings && ratings.length) {
      return <span>{Number(ratings[0].averageRating).toFixed(1)}</span>;
    }
    return "";
  };

  render() {
    const { openRatingForm, rating } = this.state;
    const {
      rate: {
        rate: { ratings }
      }
    } = this.props;
    return (
      <div className="rating__container">
        {openRatingForm ? (
          <div className="ratings">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick}
              starColor="#1b1242"
              emptyStarColor="grey"
            />
          </div>
        ) : (
          <div>
            {this.renderRatingNumber(ratings)}
            <Rate onClick={this.toggleShowRatingForm} />
          </div>
        )}
      </div>
    );
  }
}

RatingForm.propTypes = {
  slug: PropTypes.string.isRequired,
  rateArticle: PropTypes.func.isRequired,
  fetchRatings: PropTypes.func.isRequired,
  rate: PropTypes.shape({}).isRequired
};
