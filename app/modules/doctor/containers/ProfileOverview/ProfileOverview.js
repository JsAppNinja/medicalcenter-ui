import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Container from 'components/Container';
import VideoPlayer from 'components/VideoPlayer';
import ProfileOverviewComponent from 'components/ProfileOverviewComponent';
import { makeSelectAuthUser } from 'modules/auth/redux/selectors';
import { saveDoctorToList } from 'containers/SaveDoctorModal/redux/actions';
import { toggleSocialModal } from '../../redux/actions';
import { makeSelectClaimed } from '../../redux/selectors';
import './style.scss';

const AD_SRC = {
  src: 'https://kangaroo-health-directory.imgix.net/ad-videos/0.mp4',
  thumb: 'https://kangaroo-health-directory.imgix.net/ad-videos/thumbnail.png?w=400',
};

class ProfileOverview extends Component {
  handleShowSocialModal = () => {
    this.props.toggleSocialModal(true);
  }

  handleShowSaveDoctorModal = () => {
    const { profile } = this.props;
    this.props.saveDoctorToList(profile.get('uuid'), profile.toJS());
  }

  gotoReviews = () => {
    this.props.handleChangeTab('reviews');
  }

  gotoCareService = () => {
    this.props.handleChangeTab('care-service');
  }

  render() {
    const {
      profile,
      featuredVideo,
      advanced,
      claimed,
      authUser,
    } = this.props;

    const bundleUUID = profile.getIn(['bundles', '0', 'uuid']);

    return (
      <div className="profile-overview">
        <Container>
          <Row>
            <Col md={8}>
              <ProfileOverviewComponent
                profile={profile}
                advanced={advanced}
                gotoReviews={this.gotoReviews}
                gotoCareService={this.gotoCareService}
                claimed={claimed}
                authUser={authUser}
                handleShowSocialModal={this.handleShowSocialModal}
                handleShowSaveDoctorModal={this.handleShowSaveDoctorModal}
                pageLink={`/doctor/${profile.get('uuid')}/checkout/${bundleUUID}`}
                profileButtonTitle="BOOK NOW"
              />
            </Col>
            <Col md={4}>
              <VideoPlayer sources={[featuredVideo ? featuredVideo.toJS() : AD_SRC]} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileOverview.propTypes = {
  profile: PropTypes.object,
  featuredVideo: PropTypes.object,
  advanced: PropTypes.bool,
  handleChangeTab: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  claimed: makeSelectClaimed(),
  authUser: makeSelectAuthUser(),
});

const mapDispatchToProps = {
  toggleSocialModal,
  saveDoctorToList,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ProfileOverview);
