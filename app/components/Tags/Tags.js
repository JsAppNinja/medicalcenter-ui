import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Tags = ({ tagItems }) => (
  <ul className="tags doctor-tags">
    {
      tagItems.map((condition, index) => (
        <li key={index}>
          {condition}
        </li>
      ))
    }
  </ul>
);

Tags.propTypes = {
  tagItems: PropTypes.object,
};

export default Tags;
