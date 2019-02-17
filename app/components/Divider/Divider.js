import React from 'react';
import cx from 'classnames';
import './style.scss';

const Divider = ({ className }) => (
  <div className={cx('divider', className)} />
);

export default Divider;
