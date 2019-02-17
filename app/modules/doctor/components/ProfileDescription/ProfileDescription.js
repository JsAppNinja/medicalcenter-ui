import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

const ProfileDescription = ({ children, className }) => (
  <div className={cx('profile-description', className)}>
    {children}
  </div>
);

ProfileDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ProfileDescription;
