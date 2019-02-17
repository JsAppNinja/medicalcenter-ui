import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Container from 'components/Container';
import Divider from 'components/Divider';
import CheckoutSummary from '../CheckoutSummary';
import './style.scss';

import { makeSelectDoctorProfile } from '../../redux/selectors';
import { selectCheckoutCustomer } from '../Checkout/redux/selectors';

const PaddedDivider = styled(Divider)`
  margin: 20px 0 !important;
`;

class CheckoutSuccess extends Component {
  render() {
    const {
      doctor,
      customer,
      match: {
        params: {
          transactionId,
        },
      },
    } = this.props;

    return (
      <Container className="checkout-details">
        <div className="checkout-details__form">
          <div className="checkout-success__header">
            <i className="checkout-success__header-icon icon_check_alt" />
            <div className="checkout-success__header-text">
              Success!
            </div>
          </div>
          <PaddedDivider />
          <div className="checkout__desc">
            Dear {customer.firstName} {customer.lastName},<br /><br />
            Thank you for booking an appointment with {doctor.get('name')}.<br />
            Dr. Appleseed will reach out to you with more appointment details soon.<br /><br />
            Your confirmation number is <strong>{transactionId}</strong>.<br /><br />
            You will receive an order confirmation email with details of your order to your current email address <a href={`mailto:${customer.email}`}>{customer.email}</a>. <br /><br />
            If you have any questions, please <Link to="/contact-us">contact us</Link>.<br /><br />
            To ensure that you continue to receive emails from KangarooHealth in your inbox, you can add the sender of this email to your address book or white list.
          </div>
          <PaddedDivider />
          <div className="checkout-success__buttons">
            <Link to={`/doctor/${doctor.get('uuid')}`} className="btn btn-primary btn-lg">Go Back to Doctor Profile</Link>
            <Link to="/doctors/knee" className="btn btn-primary btn-lg">Continue Care Search</Link>
          </div>
        </div>
        <CheckoutSummary />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  customer: selectCheckoutCustomer(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(CheckoutSuccess);
