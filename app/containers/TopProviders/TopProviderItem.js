import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'components/StarRating';
import Divider from 'components/Divider';
import VideoPlayer from 'components/VideoPlayer';

const AD_SRC = {
  src: 'https://kangaroo-health-directory.imgix.net/ad-videos/0.mp4',
};

const TopProviderItem = ({ doctor, addDoctor }) => {
  const videoSrc = doctor.getIn(['videos', '0']);
  return (
    <div className="top-providers__item">
      <Link to={`/doctor/${doctor.get('uuid')}`} className="top-providers__item-name">
        {doctor.get('name')}
      </Link>
      <div className="top-providers__item-title">
        {doctor.get('title') || 'Orthopedic Surgeon'}
      </div>
      <div className="top-providers__item-video">
        {videoSrc && <VideoPlayer sources={[videoSrc.toJS()]} />}
        {!videoSrc &&
          <VideoPlayer sources={[AD_SRC]} />
        }
      </div>
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
        <i className="icon_heart_alt top-providers__item-save" onClick={addDoctor} />
      </div>
    </div>
  );
};

TopProviderItem.propTypes = {
  doctor: PropTypes.object,
  addDoctor: PropTypes.func,
};

export default TopProviderItem;
