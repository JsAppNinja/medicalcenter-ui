import React from 'react';
import Loader from 'react-loaders';
import './style.scss';

const PageLoading = () => (
  <div className="page-loading">
    <Loader type="pacman" active />
  </div>
);

export default PageLoading;
