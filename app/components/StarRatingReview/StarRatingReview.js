import React, { Component } from 'react';
import Rater from 'react-rater';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';

import './StarRatingReview.scss';

class StarRatingReview extends Component {
  render() {
    const {
      rating,
      reviews,
    } = this.props;

    return (
      <div className="rating-passive">
        <span className="stars">
          <Rater
            total={5}
            rating={parseInt(rating, 10)}
            interactive={false}
          />
        </span>
        <span className="reviews">{reviews}</span>
      </div>
    );
  }
}

StarRatingReview.propTypes = {
  rating: PropTypes.string,
  reviews: PropTypes.string,
};

StarRatingReview.defaultProps = {
  rating: '0',
  reviews: '',
};

export default StarRatingReview;
