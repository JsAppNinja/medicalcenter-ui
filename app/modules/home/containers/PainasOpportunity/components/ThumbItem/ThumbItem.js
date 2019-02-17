import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

const ThumbItem = ({ doctor }) => (
  <li>
    <Link to={`/doctor/${doctor.get('uuid')}`} className="thumbnail">
      <div className="thumbnail-image" style={{ backgroundImage: `url('${doctor.get('photo_url')}?w=160')` }} />
    </Link>
  </li>
);

ThumbItem.propTypes = {
  doctor: PropTypes.object,
};

export default ThumbItem;
