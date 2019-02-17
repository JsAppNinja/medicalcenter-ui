import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ICONS from './icons';

const SvgIcon = ({ icon, className, ...otherProps }) => {
  const content = { __html: ICONS[icon] };

  return (
    <div
      className={cx('svg-icon', className)}
      {...otherProps}
      dangerouslySetInnerHTML={content} // eslint-disable-line
    />
  );
};

SvgIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  icon: '',
};

export default SvgIcon;
