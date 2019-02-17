import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Divider from 'components/Divider';
import Avatar from 'components/Avatar';
import StarRating from 'components/StarRating';
import './style.scss';

import { makeSelectDoctorProfile } from '../../redux/selectors';
import { selectCheckoutDates, selectPrice } from '../Checkout/redux/selectors';
const PaddedDivider = styled(Divider)`
  margin: 20px 0 !important;
`;

class CheckoutSummary extends Component {
  renderDoctor() {
    const { doctor } = this.props;
    return (
      <div className="checkout-summary__doctor">
        <Avatar
          src={`${doctor.get('photo_url')}?w=70`}
          name={doctor.get('name')}
          size="sm"
        />
        <div className="checkout-summary__doctor-info">
          <div className="checkout-summary__doctor-info__rating">
            <StarRating rating={doctor.get('rating')} />
            <u>{doctor.get('rating')} stars ({doctor.get('review_list').size} reviews)</u>
          </div>
          <div className="checkout-summary__doctor-info__name">
            {doctor.get('name')}
          </div>
          <div className="checkout-summary__doctor-info__exp">
            <strong>{doctor.get('experience') || 10}</strong> Yrs Exp
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { doctor, dates, price } = this.props;
    const exp = doctor.get('experience') || 10;
    return (
      <div className="checkout-summary">
        <div className="checkout__title">
          Summary
        </div>
        <div className="checkout-summary__content">
          {this.renderDoctor()}
          <PaddedDivider />
          <div className="checkout-summary__price">
            ${price.total}
          </div>
          <div className="checkout__desc">
            <strong>{450 * exp}</strong> patients have consulted this doctor
          </div>
          <PaddedDivider />
          <div className="checkout-summary__subtitle">
            Appointment Details
          </div>
          <div className="checkout-summary__item">
            <div className="checkout-summary__item-label">1st Date</div>
            <div className="checkout-summary__item-value">{dates.date_1}</div>
          </div>
          <div className="checkout-summary__item">
            <div className="checkout-summary__item-label">2nd Date</div>
            <div className="checkout-summary__item-value">{dates.date_2}</div>
          </div>
          <div className="checkout-summary__item">
            <div className="checkout-summary__item-label">3rd Date</div>
            <div className="checkout-summary__item-value">{dates.date_3}</div>
          </div>
          <div className="checkout-summary__item">
            <div className="checkout-summary__item-label">4th Date</div>
            <div className="checkout-summary__item-value">{dates.date_4}</div>
          </div>
          <div className="checkout-summary__item margin-top-20px">
            <div className="checkout-summary__item-label">Location</div>
            <div className="checkout-summary__item-value">
              {doctor.get('street')},<br />
              {doctor.get('city')},<br />
              {doctor.get('state')}, {doctor.get('country') || 'USA'}
            </div>
          </div>
          <PaddedDivider />

          <div className="checkout-summary__footer">
            <div className="checkout-summary__footer-secure">
              <i className="fa fa-calendar-check-o" />
            </div>
            <div className="checkout-summary__footer-text">
              Secure Booking
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  dates: selectCheckoutDates(),
  price: selectPrice(),
});

const withConnect = connect(mapStateToProps);

export default compose(withRouter, withConnect)(CheckoutSummary);
