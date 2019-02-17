import React from 'react';
import Loader from 'react-loaders';
import './style.scss';

const FeedsLoading = () => (
  <div className="feed-loader">
    <Loader type="ball-pulse" active />
  </div>
);

export default FeedsLoading;
