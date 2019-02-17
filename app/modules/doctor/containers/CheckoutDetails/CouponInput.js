import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import debounce from 'lodash/debounce';
import {
  // makeSelectCouponLoading,
  makeSelectCouponError,
  makeSelectCoupon,
} from '../Checkout/redux/selectors';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import { doctorCouponRequest } from '../Checkout/redux/actions';

class CouponInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.verifyCoupon = debounce(props.verifyCoupon, 500);
  }

  onChange = (e) => {
    const { doctor } = this.props;
    this.setState({ value: e.target.value });
    this.verifyCoupon(doctor.get('uuid'), e.target.value);
  }

  render() {
    const {
      couponError,
      coupon,
    } = this.props;
    const { value } = this.state;
    let validationState;
    let helpText;

    if (couponError) {
      validationState = 'error';
      helpText = couponError;
    } else if (coupon) {
      validationState = 'success';
      const couponType = coupon.get('type');
      const couponValue = coupon.get('value');
      if (couponType === '$') {
        helpText = `Flat $${couponValue} OFF`;
      } else {
        helpText = `${couponValue}% OFF`;
      }
    }

    return (
      <FormGroup id="coupon" validationState={validationState}>
        <ControlLabel>Coupon</ControlLabel>
        <FormControl type="text" onChange={this.onChange} value={value} />
        <FormControl.Feedback />
        {helpText && <HelpBlock>{helpText}</HelpBlock>}
      </FormGroup>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  coupon: makeSelectCoupon(),
  couponError: makeSelectCouponError(),
  doctor: makeSelectDoctorProfile(),
});

const mapDispatchToProps = {
  verifyCoupon: doctorCouponRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(CouponInput);
