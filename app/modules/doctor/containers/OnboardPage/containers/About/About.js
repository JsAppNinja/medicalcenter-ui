import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormTitle from 'components/FormTitle';
import ReduxFormFields from 'components/ReduxFormFields';
import Divider from 'components/Divider';
import {
  isRequired,
  isUrl,
} from 'utils/redux-form-validators';
import AddableInput from '../../components/AddableInput';
import EducationItem from '../../components/EducationItem';
import BoardCertificationItem from '../../components/BoardCertificationItem';
import MembershipItem from '../../components/MembershipItem';
import AwardsItem from '../../components/AwardsItem';
import PublicationItem from '../../components/PublicationItem';
import Footer from '../../components/Footer';
import LANGUAGES from '../../constants/LANGUAGES';

import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';

import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 20px 0 40px 0 !important;
`;

class About extends Component {
  componentWillMount() {
    const { doctor } = this.props;

    if (doctor) {
      this.props.initialize({
        phone: doctor.get('phone'),
        website: doctor.get('website'),
        education: doctor.get('education') || [],
        hospitalAffiliates: doctor.get('hospital_affiliates') || [],
        languages: doctor.get('languages') || [],
        boardCertifications: doctor.get('board_certifications') || [],
        professionalMembership: doctor.get('memberships') || [],
        awards: doctor.get('awards') || [],
        publications: doctor.get('media_publications') || [],
      });
    }
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div className="onboard-container">
        <Form className="onboard-container__form">
          <FormTitle title="About The Physician" />
          <Row>
            <Col sm={6}>
              <Field
                name="phone"
                component={ReduxFormFields.Input}
                type="text"
                label="Phone Number"
                placeholder="12345678901"
                validate={[isRequired]}
              />
            </Col>
            <Col sm={6}>
              <Field
                name="website"
                component={ReduxFormFields.Input}
                type="text"
                label="Website"
                placeholder="Your Website"
                validate={[isRequired, isUrl]}
              />
            </Col>
          </Row>

          <PaddedDivider />

          <Row className="onboard-container__form-education">
            <Col sm={12}>
              <FieldArray
                name="education"
                label="Education"
                component={EducationItem}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12} className="onboard-container__form-hospital">
              <FieldArray
                name="hospitalAffiliates"
                label="Hospital Affiliation"
                component={AddableInput}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <Field
                name="languages"
                component={ReduxFormFields.TagInput}
                items={LANGUAGES.map((lang) => ({
                  id: lang.name,
                  title: lang.name,
                }))}
                placeholder="Enter Language"
                label="Languages Spoken"
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <FieldArray
                name="boardCertifications"
                label="Board Certifications"
                component={BoardCertificationItem}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <FieldArray
                name="professionalMembership"
                label="Professional Membership"
                component={MembershipItem}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <FieldArray
                name="awards"
                label="Awards"
                component={AwardsItem}
              />
            </Col>
          </Row>
          <PaddedDivider />
          <Row>
            <Col sm={12}>
              <FieldArray
                name="publications"
                label="Publications"
                component={PublicationItem}
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
    form: 'doctor-about',
  }),
)(About);
