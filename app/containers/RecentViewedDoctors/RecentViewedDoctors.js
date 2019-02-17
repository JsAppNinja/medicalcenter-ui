import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Container from 'components/Container';
import { saveDoctorToList } from 'containers/SaveDoctorModal/redux/actions';

import RecentViewedDoctor from './components/RecentViewedDoctor';
import './style.scss';

import { servicesRecentViewedDoctorsRequest } from './redux/actions';
import { makeSelectRecentViewedDoctorsList } from './redux/selectors';

class RecentViewedDoctors extends Component {
  componentWillMount() {
    this.props.getDoctors();
  }

  render() {
    const { doctors, addDoctor } = this.props;
    return (
      <Container>
        <div className="recent-viewed-doctors">
          <div className="recent-viewed-doctors__title">Recently Viewed Doctors</div>
          <Row>
            {doctors.map((doctor) => (
              <Col xs={6} sm={3} className="article" key={doctor.getIn(['doctor', 'uuid'])}>
                <RecentViewedDoctor
                  doctor={doctor.get('doctor')}
                  toggleSaveModal={() => addDoctor(doctor.getIn(['doctor', 'uuid']), doctor.get('doctor'))}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  }
}

RecentViewedDoctors.propTypes = {
  getDoctors: PropTypes.func,
  doctors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  doctors: makeSelectRecentViewedDoctorsList(),
});

const mapDispatchToProps = {
  getDoctors: servicesRecentViewedDoctorsRequest,
  addDoctor: saveDoctorToList,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RecentViewedDoctors);
