import React from 'react';
import PropTypes from 'prop-types';

const ContentHeading = ({ title, children }) => (
  <header className="content-heading">
    <h2 className="main-heading">{title}</h2>
    <span className="main-subtitle">{children}</span>
    <div className="seperator" />
  </header>
);

ContentHeading.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

ContentHeading.defaultProps = {
  title: '',
};

export default ContentHeading;
