import React from 'react';
import PropTypes from 'prop-types';
import DataItem from './DataItem';
import './style.scss';

const DataList = ({ children }) => (
  <div className="data-list">
    {children}
  </div>
);

DataList.propTypes = {
  children: PropTypes.node,
};

DataList.Item = DataItem;

export default DataList;
