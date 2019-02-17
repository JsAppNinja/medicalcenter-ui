import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Container from 'components/Container';
import Divider from 'components/Divider';
import { ReviewItem } from 'components/Reviews';
import RecentViewedDoctors from 'containers/RecentViewedDoctors';

import ProfileDescription from '../../components/ProfileDescription';
import SectionHeader from '../../components/SectionHeader';
import VideoList from '../../components/VideoList';
import SocialShareModal from '../SocialShareModal';

import {
  makeSelectDoctorProfile,
  makeSelectFeaturedReview,
  makeSelectFeaturedVideo,
} from '../../redux/selectors';

import ProfileOverview from '../ProfileOverview';
import ProfileTabs from '../ProfileTabs';

import './style.scss';

class AdvancedProfile extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'reviews',
    };
  }

  handleChangeTab = (tab) => {
    this.setState({ tab });
  }

  seeAllReviews = () => {
    this.handleChangeTab('reviews');
  }

  renderFeaturedReviewSection() {
    const { featuredReview } = this.props;

    return (
      <React.Fragment>
        <SectionHeader>Featured Review</SectionHeader>
        <ReviewItem
          featured
          rating={featuredReview.get('rating')}
          date={featuredReview.get('date')}
          description={featuredReview.get('description')}
          name={featuredReview.get('name')}
          title={featuredReview.get('title')}
        />
      </React.Fragment>
    );
  }
  render() {
    const { doctor, featuredReview, featuredVideo } = this.props;
    const { tab } = this.state;
    const videos = doctor.get('videos')
      .filter((v) => v.get('title') !== featuredVideo.get('title'))
      .toJS();

    return (
      <div className="profile profile--advanced">
        <ProfileOverview
          profile={doctor}
          featuredVideo={featuredVideo}
          handleChangeTab={this.handleChangeTab}
          advanced
        />
        <Container>
          <Row>
            <Col md={8}>
              <ProfileDescription>{doctor.get('bio')}</ProfileDescription>
              {featuredReview && this.renderFeaturedReviewSection()}
              <div className="clearfix">
                <a href="#tabs" className="btn btn-cta btn-framed pull-right" onClick={this.seeAllReviews}>See All Reviews</a>
              </div>
              <div className="profile--advanced__specialities">
                <SectionHeader>Specialities: {doctor.get('specialities') && doctor.get('specialities').join(', ')}</SectionHeader>
              </div>
              <Divider />
              <a name="tabs" />
              <ProfileTabs onSelect={this.handleChangeTab} tab={tab} />
            </Col>
            <Col md={4} className="profile--advanced__videolist">
              <VideoList boundQuery videos={videos} limit={4} className="margin-top-40px" playerClassName="col-sm-12" />
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
  featuredReview: makeSelectFeaturedReview(),
  featuredVideo: makeSelectFeaturedVideo(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect,
)(AdvancedProfile);
