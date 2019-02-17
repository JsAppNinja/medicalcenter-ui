import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ReduxFormFields from 'components/ReduxFormFields';
import Divider from 'components/Divider';
import Container from 'components/Container';
import Reaptcha from 'reaptcha';
import {
  isRequired,
  isEmail,
  isPhone,
} from 'utils/redux-form-validators';
import { makeSelectContactSending, makeSelectCaptcha } from '../../redux/selectors';
import { contactCaptchaVerify } from '../../redux/actions';

import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 10px 0 20px !important;
`;

class ContactForm extends Component {
  componentWillMount() {
    this.props.initialize({
      subject: 'General Inquiry',
    });
  }

  onCaptchaVerify = (response) => {
    this.props.verifyCaptcha(response);
  }

  render() {
    const { handleSubmit, isLoading, captcha } = this.props;

    return (
      <Container>
        <div className="contact-form">
          <div className="contact__title">
            Contact Us
          </div>
          <PaddedDivider />
          <Form className="checkout-booking__form" onSubmit={handleSubmit}>
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
              <Col sm={12}>
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
                <Field
                  name="subject"
                  label="Subject"
                  componentClass="select"
                  component={ReduxFormFields.Input}
                  rows={4}
                  validate={[isRequired]}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Report Bug">Report Bug</option>
                </Field>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Field
                  name="comment"
                  componentClass="textarea"
                  component={ReduxFormFields.Input}
                  rows={4}
                  placeholder="Please do not include links or credit card information"
                  validate={[isRequired]}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Reaptcha
                  sitekey={process.env.RECAPTCHA_SITE_KEY}
                  onVerify={this.onCaptchaVerify}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4} smOffset={8}>
                <Button type="submit" bsSize="lg" bsStyle="primary" className="btn-block" disabled={!captcha || isLoading}>
                  {isLoading ? 'Processing...' : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectContactSending(),
  captcha: makeSelectCaptcha(),
});

const mapDispatchToProps = {
  verifyCaptcha: contactCaptchaVerify,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'contact-form',
  })
)(ContactForm);
