import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, FieldArray } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormTitle from 'components/FormTitle';
import BlogItem from '../../components/BlogItem';
import Footer from '../../components/Footer';

import './style.scss';
import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';

class Blog extends Component {
  componentWillMount() {
    const { doctor } = this.props;

    if (doctor) {
      this.props.initialize({
        articles: doctor.get('articles') || [],
      });
    }
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div className="blog-container">
        <Form className="blog-container__form">
          <FormTitle title="Blog &amp; Articles" />
          <Row>
            <Col sm={12}>
              <FieldArray
                name="articles"
                label="Articles"
                component={BlogItem}
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
    form: 'doctor-blog',
  }),
)(Blog);
