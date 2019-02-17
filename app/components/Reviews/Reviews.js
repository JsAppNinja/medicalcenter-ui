import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadableList from '../LoadableList';
import ReviewItem from './ReviewItem';
import './style.scss';

class Reviews extends Component {
  render() {
    const { reviews, limit } = this.props;

    return (
      <LoadableList items={reviews} limit={limit} btnText="Load More Reviews">
        {((review, index) => (
          <ReviewItem
            key={`review_${index}`}
            featured={false} // always false on the list
            rating={review.rating}
            date={review.date}
            description={review.description}
            name={review.name}
          />
        ))}
      </LoadableList>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array,
  limit: PropTypes.number,
};

Reviews.defaultProps = {
  reviews: [],
  limit: 4,
};

Reviews.Item = ReviewItem;

export default Reviews;
