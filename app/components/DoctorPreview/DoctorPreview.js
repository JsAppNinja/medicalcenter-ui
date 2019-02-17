import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getCurrency } from 'utils/currency';
import LogoImg from 'images/KangarooMD-logo.png';
import StarRating from '../StarRating';
import './style.scss';

const DoctorPreview = ({
  className,
  name,
  title,
  photo,
  lowestPrice,
  experience,
  reviewCount,
  rating,
  uuid,
  simplified,
}) => (
  <div className={cx('doctor-preview', className, { 'doctor-preview--simplified': simplified })}>
    <div className="doctor-preview__img" style={{ backgroundImage: `url('${photo}')` }} />
    <div className="doctor-preview__content">
      <div className="doctor-preview__content-header">
        <div className="doctor-preview__content-name">
          {name}
        </div>
        <div className="doctor-preview__content-title">
          {title}
        </div>
      </div>
      <div className="doctor-preview__content-body">
        <div className="doctor-preview__content-price">
          from <strong>{getCurrency(lowestPrice)}</strong>
        </div>
        <div className="doctor-preview__content-rating">
          <StarRating rating={rating} />
          <u>{rating} stars ({reviewCount} reviews)</u>
        </div>
        <div className="doctor-preview__content-exp">
          <strong>{experience || '10'}</strong> Yrs Exp
        </div>
      </div>
    </div>
    {!simplified &&
      <div className="doctor-preview__footer">
        <a className="doctor-preview__footer-link" href={`/doctors/${uuid}`}>View on KangarooMD</a>
        <a href="/" className="doctor-preview__footer-logo">
          <img className="img-responsive" src={LogoImg} alt="logo" />
        </a>
      </div>}
  </div>
);

DoctorPreview.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  photo: PropTypes.string,
  lowestPrice: PropTypes.any,
  experience: PropTypes.number,
  reviewCount: PropTypes.number,
  rating: PropTypes.string,
  uuid: PropTypes.string,
  simplified: PropTypes.bool,
};

DoctorPreview.defaultProps = {
  simplified: false,
};

export default DoctorPreview;
