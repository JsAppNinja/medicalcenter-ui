import React from 'react';
import PropTypes from 'prop-types';

const IntroContent = ({ title, children }) => (
  <div>
    <h2 className="intro-heading">{title}</h2>
    <p className="intro text-left">{children}</p>
  </div>
);

IntroContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

IntroContent.defaultProps = {
  title: '',
};

export default IntroContent;
