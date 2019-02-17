import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'components/StarRating';
import Photo from 'components/Photo';
import Divider from 'components/Divider';

const RecentViewedDoctor = ({ doctor, toggleSaveModal }) => (
  <div className="recent-viewed-doctors__item">
    <Link to={`/doctor/${doctor.get('uuid')}`} className="recent-viewed-doctors__item-name">
      {doctor.get('name')}
    </Link>
    <div className="recent-viewed-doctors__item-title">
      {doctor.get('title') || 'Orthopedic Surgeon'}
    </div>
    <Link to={`/doctor/${doctor.get('uuid')}`}>
      <Photo src={`${doctor.get('photo_url')}`} className="recent-viewed-doctors__item-photo" />
    </Link>
    <Divider />
    <div className="doctor-preview__content-body">
      <div className="doctor-preview__content-price">
        from <strong>${doctor.get('lowest_consultation_price')}</strong>
      </div>
      <div className="doctor-preview__content-rating">
        <StarRating rating={doctor.get('rating')} />
        <u>{doctor.get('rating')} stars ({doctor.get('review_list').size} reviews)</u>
      </div>
      <div className="doctor-preview__content-exp">
        <strong>{doctor.get('experience') || '10'}</strong> Yrs Exp
      </div>
      <i className="icon_heart_alt recent-viewed-doctors__item-save" onClick={toggleSaveModal} />
    </div>
    <Divider />
  </div>
);

RecentViewedDoctor.propTypes = {
  doctor: PropTypes.object,
  toggleSaveModal: PropTypes.func,
};

export default RecentViewedDoctor;
