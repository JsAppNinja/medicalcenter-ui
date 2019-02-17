import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import ReduxFormFields from 'components/ReduxFormFields';
import Divider from 'components/Divider';
import Container from 'components/Container';
import {
  isRequired,
  isZipcode,
  isEmail,
  isPhone,
  isCreditCard,
  isCvv,
  isTrue,
  isNumeric,
  isDD,
  isYY,
  isMM,
  isYYYY,
} from 'utils/redux-form-validators';
import CardImg from 'images/cards.png';

import CouponInput from './CouponInput';
import CheckoutSummary from '../CheckoutSummary';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import { makeSelectCheckoutLoading, makeSelectCheckoutError, selectCheckoutValid } from '../Checkout/redux/selectors';
import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 20px 0 !important;
`;

class CheckoutDetails extends Component {
  render() {
    const {
      handleSubmit,
      checkoutValid,
      isLoading,
      apiError,
    } = this.props;

    return (
      <Container className="checkout-details">
        <Form className="checkout-details__form" onSubmit={handleSubmit}>
          <div className="checkout__title">
            Personal Information
          </div>
          <PaddedDivider />
          <Row>
            <Col sm={6}>
              <Field
                name="firstName"
                component={ReduxFormFields.Input}
                type="text"
                label="First Name"
                placeholder="John"
                validate={[isRequired]}
              />
            </Col>
            <Col sm={6}>
              <Field
                name="lastName"
                component={ReduxFormFields.Input}
                type="text"
                label="Last Name"
                placeholder="Appleseed"
                validate={[isRequired]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="email"
                component={ReduxFormFields.Input}
                type="email"
                label="Email Address"
                placeholder="johnappleseed@email.com"
                validate={[isRequired, isEmail]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                name="phone"
                component={ReduxFormFields.Input}
                type="text"
                label="Phone Number"
                placeholder="12345678901"
                validate={[isRequired, isPhone]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="checkout-details__desc">
                * the doctor’s office may need to contact you with follow-up questions
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Field
                name="birthMonth"
                component={ReduxFormFields.Input}
                type="text"
                label="Date of Birth"
                maxLength={2}
                inputMode="numeric"
                placeholder="MM"
                validate={[isRequired, isNumeric, isMM]}
              />
            </Col>
            <Col xs={4}>
              <Field
                name="birthDay"
                component={ReduxFormFields.Input}
                type="text"
                label={<span>&nbsp;</span>}
                maxLength={2}
                inputMode="numeric"
                placeholder="DD"
                validate={[isRequired, isNumeric, isDD]}
              />
            </Col>
            <Col xs={4}>
              <Field
                name="birthYear"
                component={ReduxFormFields.Input}
                type="text"
                label={<span>&nbsp;</span>}
                maxLength={4}
                inputMode="numeric"
                placeholder="YYYY"
                validate={[isRequired, isNumeric, isYYYY]}
              />
            </Col>
          </Row>
          <div className="checkout__title margin-top-20px">
            Payment Information
          </div>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <Field
                name="billingAddress"
                component={ReduxFormFields.Input}
                type="text"
                label="Billing Address"
                validate={[isRequired]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                name="billingZipcode"
                component={ReduxFormFields.Input}
                type="text"
                inputMode="numeric"
                label="Billing Zip Code"
                validate={[isRequired, isZipcode]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="cardNumber"
                component={ReduxFormFields.Password}
                inputMode="numeric"
                type="text"
                label={<span>Card Number <img src={CardImg} className="checkout-details__card" alt="cards" /></span>}
                maxLength={16}
                validate={[isRequired, isCreditCard]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4} xs={6}>
              <Field
                name="expirationMonth"
                component={ReduxFormFields.Input}
                inputMode="numeric"
                type="text"
                maxLength={2}
                placeholder="MM"
                label="Expiration Date"
                validate={[isRequired, isMM, isNumeric]}
              />
            </Col>
            <Col sm={4} xs={6}>
              <Field
                name="expirationYear"
                component={ReduxFormFields.Input}
                type="text"
                maxLength={2}
                inputMode="numeric"
                label={<span>&nbsp;</span>}
                placeholder="YY"
                validate={[isRequired, isYY, isNumeric]}
              />
            </Col>
            <Col sm={4}>
              <Field
                name="cvv"
                component={ReduxFormFields.Password}
                type="text"
                maxLength={3}
                inputMode="numeric"
                label="Security Code / CVV"
                validate={[isRequired, isCvv]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <CouponInput />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <Field
                name="termsOfUse"
                component={ReduxFormFields.Checkbox}
                label={
                  <span>I have read and accepted KangarooHealth&apos;s <Link to="/terms-of-use">Terms Of Use</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</span>
                }
                validate={[isTrue]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="hippaAuth"
                component={ReduxFormFields.Checkbox}
                label={
                  <span>I have read and accepted KangarooHealth&apos;s <a>HIPAA Authorization</a>.</span>
                }
                validate={[isTrue]}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              {apiError &&
                <Alert bsStyle="danger">
                  {apiError}
                </Alert>}
            </Col>
            <Col sm={12}>
              <Button type="submit" bsStyle="primary" bsSize="lg" className="btn-block" disabled={!checkoutValid || isLoading}>
                {isLoading ? 'Procssing Order...' : 'Book Now'}
              </Button>
            </Col>
            <Col sm={12}>
              <div className="text-center margin-top-20px">
                <a onClick={this.props.onPrevStep}>Go to Previous Step</a>
              </div>
            </Col>
          </Row>
        </Form>
        <CheckoutSummary />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  checkoutValid: selectCheckoutValid(),
  isLoading: makeSelectCheckoutLoading(),
  apiError: makeSelectCheckoutError(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-checkout',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  }),
)(CheckoutDetails);
