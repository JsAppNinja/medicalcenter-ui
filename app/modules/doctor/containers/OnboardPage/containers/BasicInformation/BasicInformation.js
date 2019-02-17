import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormTitle from 'components/FormTitle';
import ReduxFormFields from 'components/ReduxFormFields';
import {
  isRequired,
  isZipcode,
  isExperienceYears,
} from 'utils/redux-form-validators';
import Footer from '../../components/Footer';
import AvatarUploadModal from '../../components/AvatarUploadModal';

import SPECIALITIES from '../../constants/SPECIALITIES';

import { toggleAvatarModal } from '../../redux/actions';
import { avatarSelector, makeSelectOnboardDoctorProfile } from '../../redux/selectors';

import './style.scss';

class BasicInformation extends Component {
  componentWillMount() {
    const { doctor } = this.props;
    if (doctor) {
      this.props.initialize({
        name: doctor.get('name'),
        title: doctor.get('title'),
        experience: doctor.get('experience'),
        zipcode: doctor.get('zipcode'),
        city: doctor.get('city'),
        state: doctor.get('state'),
        country: doctor.get('country'),
        bio: doctor.get('bio'),
        specialities: doctor.get('specialities'),
      });
    }
  }

  handleAvatarModal = () => {
    this.props.toggleAvatarModal(true);
  };

  render() {
    const {
      handleSubmit,
      doctor,
      uploadedAvatarImgUrl,
    } = this.props;

    return (
      <div className="basic-info">
        <div className="basic-info__text">
          Welcome! Thank you for joining KangarooHealth, the world’s largest network of top physicians.
          After filling out the profile information, you will be in front of millions of patients.
          We are your business partner to increase patient volume and boost your reputation among patient populations.
          Your progress is always automatically saved. If there are any questions, please feel free to &nbsp;
          <Link to="/contact-us">contact us</Link>.
        </div>
        <Form className="basic-info__form">
          <FormTitle title="Basic Information" />
          <Row>
            <Col sm={6}>
              <Field
                name="name"
                component={ReduxFormFields.Input}
                type="text"
                label="Name"
                placeholder="Dr. John Appleseed, MD"
                validate={[isRequired]}
              />
            </Col>
            <Col sm={6}>
              <Field
                name="title"
                component={ReduxFormFields.Input}
                type="text"
                label="Title"
                placeholder="Orthopedic Surgeon"
                validate={[isRequired]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                name="experience"
                component={ReduxFormFields.Input}
                type="text"
                label="No.of Years Experience"
                placeholder=""
                nextLabel="Years"
                validate={[isRequired, isExperienceYears]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                name="city"
                component={ReduxFormFields.Input}
                type="text"
                label="City"
                placeholder=""
                validate={[isRequired]}
              />
            </Col>
            <Col sm={6}>
              <Field
                name="state"
                component={ReduxFormFields.StateSelect}
                label="State"
                validate={[isRequired]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Field
                name="country"
                component={ReduxFormFields.Select}
                label="Country"
                options={['USA']}
                validate={[isRequired]}
              />
            </Col>
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
              <label>Avatar</label>
              <p>Your photo should be at least 250px by 300px</p>
              <div
                style={{ backgroundImage: `url(${uploadedAvatarImgUrl || doctor.get('photo_url')})` }}
                className="basic-info__upload"
                onClick={this.handleAvatarModal}
              >
                <i className="fa fa-plus-circle upload-icon" />
                <p className="upload-title">Upload Photo</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                name="bio"
                component={ReduxFormFields.TextField}
                label="Bio:"
                placeholder=""
                validate={[isRequired]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="basic-info__specialty">
                Specialty:
              </div>
            </Col>
            <Col sm={12}>
              <Field
                name="specialities"
                items={SPECIALITIES}
                component={ReduxFormFields.ItemToggle}
              />
            </Col>
          </Row>
          <Footer handleSubmit={handleSubmit} />
          <AvatarUploadModal />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  uploadedAvatarImgUrl: avatarSelector(),
  doctor: makeSelectOnboardDoctorProfile(),
});

const mapDispatchToProps = {
  toggleAvatarModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-basic-info',
  }),
)(BasicInformation);
