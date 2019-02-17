import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import StarRating from 'components/StarRating';

const ReviewItem = ({
  rating, date, description, title, name, featured,
}) => {
  const className = cx('kreview', {
    'kreview--featured': featured,
  });

  return (
    <div className={className}>
      <div className="kreview__rating">
        <StarRating rating={rating} />
      </div>
      <div className="kreview__content">
        {title &&
          <div className="kreview__content-title">
            “{title}”
          </div>}
        <div className="kreview__content-reviewer">
          <div className="kreview__content-reviewer__name">
            {name || 'Anonymous'}
          </div>
          <div className="kreview__content-reviewer__date">
            {date}
          </div>
        </div>
        <div className="kreview__content-description">
          {description}
        </div>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  featured: PropTypes.bool,
  rating: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

ReviewItem.defaultProps = {
  featured: false,
  rating: 5,
};

export default ReviewItem;
