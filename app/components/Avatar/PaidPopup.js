import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransparentImg from 'images/icons/transparent.png';
import CaringImg from 'images/icons/caring.png';
import TrustedImg from 'images/icons/trusted.png';
import Divider from '../Divider';

const PaidPopup = ({ name }) => (
  <div className="avatar__popup">
    <div className="avatar__popup-title">
      KangarooMD Promise
    </div>
    <div className="avatar__popup-text">
      This provider has pledged to give you great customer service.
    </div>

    <Divider />

    <div className="avatar__popup-badges">
      <div className="avatar__popup-badges__item">
        <img src={TransparentImg} alt="transparent" />
        <span>Transparent</span>
      </div>
      <div className="avatar__popup-badges__item">
        <img src={TrustedImg} alt="trustred" />
        <span>Trusted</span>
      </div>
      <div className="avatar__popup-badges__item">
        <img src={CaringImg} alt="caring" />
        <span>Caring</span>
      </div>
    </div>

    <Link to="/services"><u>Learn More</u></Link>

    <div className="avatar__popup-text">
      Do you have feedback about {name}’s commitment to the KangarooMD Promise?
    </div>

    <Link className="btn btn-primary" to="/contact-us">Let Us Know</Link>
  </div>
);

PaidPopup.propTypes = {
  name: PropTypes.string,
};

PaidPopup.defaultProps = {
  name: '',
};

export default PaidPopup;
