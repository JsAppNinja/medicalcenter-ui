import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReduxFormFields from 'components/ReduxFormFields';
import FormTitle from 'components/FormTitle';
import { isRequired } from 'utils/redux-form-validators';
import Footer from '../../components/Footer';
import TRAVELS from '../../constants/TRAVELS';
import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';
import './style.scss';

class Travel extends Component {
  componentWillMount() {
    const { doctor } = this.props;
    let items = TRAVELS;

    if (doctor && doctor.get('travels')) {
      items = doctor.get('travels').toJS();
    }

    this.props.initialize({
      internationalTravel: items[0].description,
      localTravel: items[1].description,
      localAccomodation: items[2].description,
      translationServices: items[3].description,
      localGuide: items[4].description,
      tourVacation: items[5].description,
      pickupHotel: items[6].description,
      pickupAirport: items[7].description,
    });
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div className="travel-container">
        <Form className="travel-container__form">
          <FormTitle title="Travel &amp; Lodging" />
          <Row>
            <Col sm={12}>
              <Field
                name="internationalTravel"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="International Travel"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="localTravel"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Local Travel"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="localAccomodation"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Local Accomodation"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="translationServices"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Translation Services"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="localGuide"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Local Guide"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="tourVacation"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Tours and Vacation Services"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="pickupHotel"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Pick Up Service from Hotel"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="pickupAirport"
                component={ReduxFormFields.TextField}
                validate={[isRequired]}
                label="Pick Up Service from Airport"
              />
            </Col>
          </Row>
          <Footer handleSubmit={handleSubmit} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectOnboardDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-travel',
  }),
)(Travel);
