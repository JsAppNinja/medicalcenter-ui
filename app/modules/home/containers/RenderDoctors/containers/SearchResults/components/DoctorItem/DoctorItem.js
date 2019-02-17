import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import StarRatingReview from 'components/StarRatingReview';
import DoctorModal from '../../../DoctorModal';

import { homeSetHoverDoctorRequest } from '../../../../redux/actions';

import './style.scss';

class DoctorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  setHoverDoctorOnOff = (hoverDoctorId) => () => {
    this.props.setHoveredDoctorId(hoverDoctorId);
  }

  showDoctorModal = () => {
    this.setState({ isModalShow: true });
  };

  hideDoctorModal = () => {
    this.setState({ isModalShow: false });
  };

  render() {
    const { doctor, hoverDoctorClassName } = this.props;
    return (
      <div
        className="result-item doctor-result-item"
        onMouseOver={this.setHoverDoctorOnOff(doctor.get('uuid'))}
        onFocus={this.setHoverDoctorOnOff(doctor.get('uuid'))}
        onMouseOut={this.setHoverDoctorOnOff('')}
        onBlur={this.setHoverDoctorOnOff('')}
      >
        {this.state.isModalShow && (
          <DoctorModal doctor={doctor} handleClose={this.hideDoctorModal} />
        )}
        <a
          className={hoverDoctorClassName}
          onClick={this.showDoctorModal}
        >
          <h3>{doctor.get('name')}</h3>
          <div className="result-item-detail">
            <div
              className="image custom-image"
              style={{ backgroundImage: `url(${doctor.get('photo_url')})` }}
            >
              <figure>Consultations: ${doctor.get('lowest_consultation_price')}</figure>
            </div>
            <div className="description">
              <h5>
                <i className="fa fa-map-marker" />
                {doctor.get('street')}
              </h5>
              <div className="rating-passive">
                <StarRatingReview
                  rating={doctor.get('rating')}
                  reviews={doctor.get('reviews')}
                />
              </div>
              <div className="result-item-detail__label">
                {doctor.get('specialties') || 'Orthopedic Surgery'}
              </div>
              <p>{doctor.get('about')}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

DoctorItem.propTypes = {
  doctor: PropTypes.object,
  setHoveredDoctorId: PropTypes.func,
};

const mapDispatchToProps = {
  setHoveredDoctorId: homeSetHoverDoctorRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(DoctorItem);
