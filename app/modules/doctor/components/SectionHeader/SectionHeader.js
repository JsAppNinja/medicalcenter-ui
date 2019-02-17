import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

const SectionHeader = ({ children, className }) => (
  <div className={cx('profile__section-header', className)}>
    {children}
  </div>
);

SectionHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeader;
