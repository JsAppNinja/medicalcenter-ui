import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DataItem = ({ title, children, className }) => (
  <div className="data-list__item">
    <div className="data-list__item-title">
      {title}
    </div>
    <div className={cx('data-list__item-body', className)}>
      {children}
    </div>
  </div>
);

DataItem.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

DataItem.defaultProps = {
  title: '',
};

export default DataItem;
