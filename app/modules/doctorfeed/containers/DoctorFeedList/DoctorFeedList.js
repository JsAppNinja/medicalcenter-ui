import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Container from 'components/Container';
import FeedInfiniteScroll from 'components/FeedInfiniteScroll';
import FeedsLoading from 'components/FeedsLoading';
import withQuery from 'hocs/withQuery';
import DoctorFeedItem from './components/DoctorFeedItem';
import {
  doctorFeedSearchRequest,
  displayFeedItemsCountSetRequest,
  initDoctorListRequest,
} from '../../redux/actions';
import {
  makeSelectDoctorfeedList,
  makeSelectDoctorfeedSearchStart,
  makeSelectDisplayFeedItemsCount,
  makeSelectIsPackageDoctorSearch,
  makeSelectSearchIsLoading,
} from '../../redux/selectors';

import './style.scss';

class DoctorFeedList extends Component {
  componentWillMount() {
    const { queryFiltersData } = this.props;
    if (queryFiltersData.package) {
      this.getDoctorFeedFromParams(true, true, queryFiltersData.package);
    } else {
      this.getDoctorFeedFromParams(true);
    }
  }

  componentWillUnmount() {
    this.props.initDoctorList();
  }

  getDoctorFeedFromParams = (isResetSearch, isPackageDoctorSearch, packageName) => {
    const {
      keyword,
      joint,
      zip,
      radius,
    } = this.props.queryFiltersData;

    this.props.getDoctorFeed(
      {
        joint,
        keyword,
        zip,
        radius,
      },
      isResetSearch,
      isPackageDoctorSearch,
      packageName,
    );
  }

  fetchMoreData = () => {
    const { displayFeedItemsCount, isPackageDoctorSearch } = this.props;
    if ((displayFeedItemsCount % 50) === 0 && !isPackageDoctorSearch) {
      this.getDoctorFeedFromParams(false);
    } else {
      this.props.setDisplayFeedItemsCount();
    }
  };

  render() {
    const {
      doctorFeed,
      displayFeedItemsCount,
      isPackageDoctorSearch,
      isLoading,
    } = this.props;

    if (!doctorFeed.size) {
      if (!isLoading) {
        return <h1 className="text-center text-message">There are no results</h1>;
      }
      return <FeedsLoading />;
    }
    const hasMoreSearch = doctorFeed.size >= displayFeedItemsCount && doctorFeed.size < 500;

    return (
      <div className="content-block content-sub">
        <Container>
          <FeedInfiniteScroll
            dataLength={displayFeedItemsCount}
            next={this.fetchMoreData}
            hasMore={hasMoreSearch}
          >
            <div className="content-holder list-view doctorfeed-list-view-items">
              {doctorFeed.slice(0, displayFeedItemsCount).map((doctor, index) => (
                <DoctorFeedItem
                  key={`item_${index}`}
                  doctor={isPackageDoctorSearch ? doctor : doctor.get('doctor')}
                />
              ))}
            </div>
          </FeedInfiniteScroll>
        </Container>
      </div>
    );
  }
}

DoctorFeedList.propTypes = {
  getDoctorFeed: PropTypes.func,
  setDisplayFeedItemsCount: PropTypes.func,
  displayFeedItemsCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  doctorFeed: makeSelectDoctorfeedList(),
  from: makeSelectDoctorfeedSearchStart(),
  displayFeedItemsCount: makeSelectDisplayFeedItemsCount(),
  isPackageDoctorSearch: makeSelectIsPackageDoctorSearch(),
  isLoading: makeSelectSearchIsLoading(),
});

const mapDispatchToProps = {
  getDoctorFeed: doctorFeedSearchRequest,
  setDisplayFeedItemsCount: displayFeedItemsCountSetRequest,
  initDoctorList: initDoctorListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withRouter,
  withConnect,
  withQuery('filters', {}),
)(DoctorFeedList);
