import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Container from 'components/Container';
import FeedInfiniteScroll from 'components/FeedInfiniteScroll';
import FeedsLoading from 'components/FeedsLoading';
import PackageItem from './components/PackageItem';

import { packagesFilterRequest, displayFeedItemsCountSetRequest } from '../../redux/actions';
import {
  makeSelectFilteredPackagesList,
  makeSelectPackagefeedSearchStart,
  makeSelectDisplayFeedItemsCount,
} from '../../redux/selectors';

import './style.scss';

class PackagesList extends Component {
  componentWillMount() {
    const { match } = this.props;
    if (match.path === '/packages/filter/:keyword') {
      this.handleGetPackageFeed('', true, match.params.keyword);
    } else if (match.params.joint) {
      this.handleGetPackageFeed(match.params.joint, true);
    } else {
      this.handleGetPackageFeed('', true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.joint !== nextProps.match.params.joint) {
      this.handleGetPackageFeed(nextProps.match.params.joint, true);
    }
    if (this.props.match.params.keyword !== nextProps.match.params.keyword) {
      this.handleGetPackageFeed('', true, nextProps.match.params.keyword);
    }
  }

  handleGetPackageFeed = (joint, isResetSearch, filterName) => {
    const from = isResetSearch ? 0 : this.props.from;
    this.props.getCarePackages(
      {
        category: '',
        joint,
        packages: '',
        price: '',
        from,
      },
      isResetSearch,
      filterName,
    );
  }

  fetchMoreData = () => {
    const { displayFeedItemsCount } = this.props;
    if ((displayFeedItemsCount % 30) === 0) {
      this.handleGetPackageFeed(false);
    } else {
      this.props.setDisplayFeedItemsCount();
    }
  };

  render() {
    const {
      packages,
      displayFeedItemsCount,
      match,
    } = this.props;

    if (!packages.size) {
      if (match.params.keyword) {
        return <h1 className="text-center text-message">There are no results</h1>;
      }
      return <FeedsLoading />;
    }

    if (!packages.size) return <FeedsLoading />;
    const hasMoreSearch = packages.size >= displayFeedItemsCount && packages.size < 500;

    return (
      <div className="content-block content-sub">
        <Container>
          <FeedInfiniteScroll
            dataLength={displayFeedItemsCount}
            next={this.fetchMoreData}
            hasMore={hasMoreSearch}
          >
            <div className="content-holder list-view carepackage-list-view-items">
              {packages.slice(0, displayFeedItemsCount).map((item, index) => (
                <PackageItem
                  key={`item_${index}`}
                  carepackage={item}
                />
              ))
              }
            </div>
          </FeedInfiniteScroll>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  packages: makeSelectFilteredPackagesList(),
  from: makeSelectPackagefeedSearchStart(),
  displayFeedItemsCount: makeSelectDisplayFeedItemsCount(),
});

const mapDispatchToProps = {
  getCarePackages: packagesFilterRequest,
  setDisplayFeedItemsCount: displayFeedItemsCountSetRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
)(PackagesList);
