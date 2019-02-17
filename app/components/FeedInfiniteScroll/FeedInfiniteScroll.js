import React from 'react';
import PropTypes from 'prop-types';
import FeedScroll from 'react-infinite-scroll-component';
import FeedsLoading from 'components/FeedsLoading';

const FeedInfiniteScroll = ({
  dataLength,
  next,
  hasMore,
  children,
}) => (
  <FeedScroll
    dataLength={dataLength}
    next={next}
    hasMore={hasMore}
    loader={<FeedsLoading />}
  >
    {children}
  </FeedScroll>
);

FeedInfiniteScroll.propTypes = {
  dataLength: PropTypes.number,
  next: PropTypes.func,
  hasMore: PropTypes.bool,
  children: PropTypes.node,
};

export default FeedInfiniteScroll;
