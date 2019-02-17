import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const ExternalLink = ({ children, className, ...otherProps }) => (
  <a className={cx('external-link', className)} target="_blank" {...otherProps}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.node,
};

ExternalLink.defaultProps = {
};

export default ExternalLink;
