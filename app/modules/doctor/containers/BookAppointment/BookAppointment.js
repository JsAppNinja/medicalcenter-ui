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
import Avatar from 'components/Avatar';
import Divider from 'components/Divider';
import Container from 'components/Container';
import {
  isRequired,
  isZipcode,
  isDate,
  isRepetitiveDate,
} from 'utils/redux-form-validators';

import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 20px 0 !important;
`;

class BookAppointment extends Component {
  render() {
    const { handleSubmit, doctor } = this.props;

    return (
      <Container>
        <div className="checkout-booking">
          <div className="checkout__title">
            Book an Appointment
          </div>
          <PaddedDivider />
          <Avatar
            src={doctor.get('photo_url')}
            name={doctor.get('name')}
            paid={doctor.get('paid')}
          />
          <div className="checkout__title">
            {doctor.get('name')}
          </div>
          <div className="checkout__subtitle">
            {doctor.get('title')}
          </div>
          <PaddedDivider />
          <Form className="checkout-booking__form" onSubmit={handleSubmit}>
            <Row>
              <Col sm={6}>
                <Field
                  name="zipcode"
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Zip Code"
                  placeholder="Zip Code"
                  validate={[isRequired, isZipcode]}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="checkout__desc">
                  * Please provide your availability below so that we can schedule a phone consultation with {doctor.get('name')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Field
                  name="date_1"
                  component={ReduxFormFields.Datepicker}
                  label="1st Date *"
                  placeholder="1st Date *"
                  dateFormat="Do MMMM, YYYY"
                  futureOnly
                  disabledDays={doctor.get('disabled_days').toJS()}
                  validate={[isRequired, isDate, isRepetitiveDate]}
                />
              </Col>
              <Col sm={6}>
                <Field
                  name="date_2"
                  component={ReduxFormFields.Datepicker}
                  label="2nd Date (optional)"
                  placeholder="2nd Date (optional)"
                  dateFormat="Do MMMM, YYYY"
                  futureOnly
                  disabledDays={doctor.get('disabled_days').toJS()}
                  validate={[isDate, isRepetitiveDate]}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Field
                  name="date_3"
                  component={ReduxFormFields.Datepicker}
                  label="3rd Date (optional)"
                  placeholder="3rd Date (optional)"
                  dateFormat="Do MMMM, YYYY"
                  futureOnly
                  disabledDays={doctor.get('disabled_days').toJS()}
                  validate={[isDate, isRepetitiveDate]}
                />
              </Col>
              <Col sm={6}>
                <Field
                  name="date_4"
                  component={ReduxFormFields.Datepicker}
                  label="4th Date (optional)"
                  placeholder="4th Date (optional)"
                  dateFormat="Do MMMM, YYYY"
                  futureOnly
                  disabledDays={doctor.get('disabled_days').toJS()}
                  validate={[isDate, isRepetitiveDate]}
                />
              </Col>
            </Row>
            <PaddedDivider />
            <Row>
              <Col sm={12}>
                <Button type="submit" bsStyle="primary" bsSize="lg" className="btn-block">
                  Book Appointment
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
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-booking',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })
)(BookAppointment);
