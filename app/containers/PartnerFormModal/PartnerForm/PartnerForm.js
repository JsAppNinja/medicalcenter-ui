import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ReduxFormFields from 'components/ReduxFormFields';
import {
  isRequired,
  isZipcode,
  isEmail,
  isPhone,
} from 'utils/redux-form-validators';

import { makeSelectPartnerInfoSending } from '../redux/selectors';

class PartnerForm extends Component {
  render() {
    const { handleSubmit, isLoading } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Field
              name="firstName"
              component={ReduxFormFields.Input}
              type="text"
              label="First Name*"
              placeholder="John"
              validate={[isRequired]}
            />
          </Col>
          <Col md={4}>
            <Field
              name="lastName"
              component={ReduxFormFields.Input}
              type="text"
              label="Last Name*"
              placeholder="Appleseed"
              validate={[isRequired]}
            />
          </Col>
          <Col md={4}>
            <Field
              name="type"
              component={ReduxFormFields.Input}
              type="text"
              label="Type"
              placeholder="MD, MDS"
            />
          </Col>
        </Row>

        <Field
          name="address"
          component={ReduxFormFields.Input}
          type="text"
          label="Address"
          placeholder="Address"
        />

        <Row>
          <Col md={4}>
            <Field
              name="city"
              component={ReduxFormFields.Input}
              type="text"
              label="City"
              placeholder="Your City"
            />
          </Col>
          <Col md={4}>
            <Field
              name="state"
              component={ReduxFormFields.Input}
              type="text"
              label="State"
              placeholder="Your State"
            />
          </Col>
          <Col md={4}>
            <Field
              name="zipcode"
              component={ReduxFormFields.Input}
              type="text"
              label="Zip Code"
              placeholder="Zip Code"
              validate={isZipcode}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Field
              name="specialty"
              component={ReduxFormFields.Input}
              type="text"
              label="Specialty"
              placeholder="Your Specialty"
            />
          </Col>
          <Col md={6}>
            <Field
              name="clinicGroup"
              component={ReduxFormFields.Input}
              type="text"
              label="Clinic / Group"
              placeholder="Your Clinic"
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Field
              name="phone"
              component={ReduxFormFields.Input}
              type="text"
              label="Phone Number*"
              placeholder="12345678901"
              validate={[isRequired, isPhone]}
            />
          </Col>
          <Col md={6}>
            <Field
              name="email"
              component={ReduxFormFields.Input}
              type="email"
              label="Email Address*"
              placeholder="johnappleseed@email.com"
              validate={[isRequired, isEmail]}
            />
          </Col>
        </Row>

        <Field
          name="website"
          component={ReduxFormFields.Input}
          type="text"
          label="Website"
          placeholder="Your Website"
        />

        <Button type="submit" bsStyle="primary" bsSize="lg" className="btn-block" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectPartnerInfoSending(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'partner-form',
  }),
)(PartnerForm);
