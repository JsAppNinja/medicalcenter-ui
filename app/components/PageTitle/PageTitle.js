import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, children }) => (
  <section className="page-title">
    <h1>{title}</h1>
    {children}
  </section>
);

PageTitle.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

PageTitle.defaultProps = {
  title: '',
};

export default PageTitle;
