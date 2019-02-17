import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import { reset } from 'redux-form';

import reducer from './redux/reducers';
import saga from './redux/saga';
import { doctorCheckoutRequest } from './redux/actions';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import BookAppointment from '../BookAppointment';
import CheckoutDetails from '../CheckoutDetails';
import './style.scss';

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      step: 'booking',
    };
  }

  componentWillMount() {
    this.props.resetForm('doctor-booking');
    this.props.resetForm('doctor-checkout');
  }

  onDetailStep = () => {
    this.setState({
      step: 'detail',
    });
  }

  onBookingStep = () => {
    this.setState({ step: 'booking' });
  }

  onProcessOrder = () => {
    const {
      processOrder,
      match: {
        params: {
          bundleUUID,
        },
      },
      doctor,
    } = this.props;
    processOrder(doctor.get('uuid'), bundleUUID);
  }

  render() {
    const { step } = this.state;

    return (
      <div className="checkout-page">
        {step === 'booking' && <BookAppointment onSubmit={this.onDetailStep} />}
        {step === 'detail' && <CheckoutDetails onPrevStep={this.onBookingStep} onSubmit={this.onProcessOrder} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const mapDispatchToProps = {
  processOrder: doctorCheckoutRequest,
  resetForm: reset,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'checkout', saga, mode: DAEMON });
const withReducer = injectReducer({ key: 'checkout', reducer });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(CheckoutPage);
