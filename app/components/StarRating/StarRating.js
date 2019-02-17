import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

class StarRating extends Component {
  render() {
    const { total, rating } = this.props;
    let value = parseInt(rating, 10);
    const stars = [];

    for (let i = 0; i < total; i += 1) {
      const starClassName = cx('icon_star', {
        'star-rating__star': value >= 1,
        'star-rating__star--off': value < 1,
      });
      stars.push(<i key={`star_${i}`} className={starClassName} />);
      value -= 1;
    }

    return (
      <div className="star-rating">
        {stars}
      </div>
    );
  }
}

StarRating.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

StarRating.defaultProps = {
  total: 5,
  rating: 0,
};

export default StarRating;
