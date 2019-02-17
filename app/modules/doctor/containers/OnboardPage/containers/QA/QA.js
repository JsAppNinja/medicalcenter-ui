import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, FieldArray } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import FormTitle from 'components/FormTitle';
import BacktoTop from 'components/BacktoTop';
import AddableQAItem from '../../components/AddableQAItem';
import Footer from '../../components/Footer';

import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';

import './style.scss';

class QA extends Component {
  componentWillMount() {
    const { doctor } = this.props;

    if (doctor) {
      this.props.initialize({
        qa_list: doctor.get('qa_list') || [],
      });
    }
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div className="qa-container">
        <Form className="qa-container__form">
          <FormTitle title="Q&amp;A" />
          <FieldArray
            name="qa_list"
            component={AddableQAItem}
          />
          <Footer handleSubmit={handleSubmit} />
        </Form>
        <BacktoTop />
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
    form: 'doctor-qa',
  }),
)(QA);
