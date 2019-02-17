import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Container from 'components/Container';
import Divider from 'components/Divider';
import RecentViewedDoctors from 'containers/RecentViewedDoctors';
import TopProviders from 'containers/TopProviders';

import ProfileDescription from '../../components/ProfileDescription';
import SectionHeader from '../../components/SectionHeader';
import SocialShareModal from '../SocialShareModal';

import {
  makeSelectDoctorProfile,
  makeSelectFeaturedVideo,
} from '../../redux/selectors';

import ProfileOverview from '../ProfileOverview';
import ProfileTabs from '../ProfileTabs';

class BasicProfile extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'reviews',
    };
  }

  handleChangeTab = (tab) => {
    this.setState({ tab });
  }

  render() {
    const { doctor, featuredVideo } = this.props;
    const { tab } = this.state;

    return (
      <div className="profile profile--basic">
        <ProfileOverview profile={doctor} featuredVideo={featuredVideo} advanced={false} handleChangeTab={this.handleChangeTab} />
        <Container>
          <Row>
            <Col md={8}>
              <ProfileDescription>{doctor.get('bio')}</ProfileDescription>
              <SectionHeader>Specialities: {doctor.get('specialities') && doctor.get('specialities').join(', ')}</SectionHeader>
              <Divider />
              <a name="tabs" />
              <ProfileTabs onSelect={this.handleChangeTab} tab={tab} advanced={false} />
            </Col>
            <Col md={4}>
              <TopProviders />
            </Col>
          </Row>
          <Divider />
          <RecentViewedDoctors />
        </Container>
        <SocialShareModal doctor={doctor} />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  featuredVideo: makeSelectFeaturedVideo(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect,
)(BasicProfile);
