import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Reviews from 'components/Reviews';
import { makeSelectDoctorReviews } from '../../redux/selectors';

class ReviewsTabContent extends Component {
  render() {
    const { reviews } = this.props;

    return (
      <Reviews reviews={reviews.toJS()} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  reviews: makeSelectDoctorReviews(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(ReviewsTabContent);
