import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Container = ({ children, className }) => (
  <div className={cx('container', className)}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
