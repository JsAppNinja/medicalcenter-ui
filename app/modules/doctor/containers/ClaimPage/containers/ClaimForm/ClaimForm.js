import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import Col from 'react-bootstrap/lib/Col';
import ReduxFormFields from 'components/ReduxFormFields';
import Button from 'react-bootstrap/lib/Button';
import {
  isRequired,
  isEmail,
  isPhone,
} from 'utils/redux-form-validators';
import { makeSelectClaimLoading, makeSelectClaimError } from '../../redux/selectors';
import { makeSelectDoctorProfile } from '../../../../redux/selectors';
import './style.scss';

class ClaimForm extends Component {
  render() {
    const {
      doctor,
      handleSubmit,
      isLoading,
      apiError,
    } = this.props;

    return (
      <div className="claim-form__container">
        <div className="claim-form">
          <div className="claim-form__title">
            Create a free physician account for {doctor.get('name')}
          </div>
          <Form className="claim-form__content" onSubmit={handleSubmit}>
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
            {apiError &&
              <Alert bsStyle="danger">
                {apiError}
              </Alert>}
            <div className="claim-form__content-desc">
              By clicking the button below, you represent that you have authority to
              claim this account on behalf of this business, and agree to KangarooHealth’s
              <Link to="/terms-of-use" className="claim-form__link">Terms of Service</Link> and <Link to="/privacy-policy" className="claim-form__link">Privacy Policy</Link>.
            </div>
            <Button type="submit" bsSize="lg" bsStyle="primary" className="btn-block" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Claim Profile'}
            </Button>
          </Form>
          <div className="claim-form__footer">
            <div className="claim-form__footer-call">
              Need help? Call&nbsp;
              <a className="claim-form__footer-call__link" href="tel:408-641-5446">408-641-5446</a>
            </div>
            {/* <div className="claim-form__footer-desc">
              Already have a physician user account?
              <br />
              <a className="claim-form__link">Log in to Claim</a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  isLoading: makeSelectClaimLoading(),
  apiError: makeSelectClaimError(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'claim-profile',
  }),
)(ClaimForm);
