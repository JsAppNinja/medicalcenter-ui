import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import FormTitle from 'components/FormTitle';
import MediaList from '../../components/MediaList';
import Footer from '../../components/Footer';

import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';
import { removeMedia } from '../../redux/actions';

import './style.scss';

class Media extends Component {
  render() {
    const {
      doctor,
      handleSubmit,
    } = this.props;

    return (
      <div className="media-container">
        <Form className="media-container__form">
          <FormTitle title="Related Videos" />
          <MediaList type="video" sources={doctor.get('videos').toJS()} removeMedia={this.props.removeMedia} />
          <FormTitle title="Related Images" />
          <MediaList type="image" sources={doctor.get('images').toJS()} removeMedia={this.props.removeMedia} />
          <Footer handleSubmit={handleSubmit} />
        </Form>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  doctor: makeSelectOnboardDoctorProfile(),
});

const mapDispatchToProps = {
  removeMedia,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-media',
  }),
)(Media);
