import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapse from 'components/Collapse';
import VideoList from '../../components/VideoList';
import ImageList from '../../components/ImageList';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class MediaTabContent extends Component {
  render() {
    const images = this.props.doctor.get('images').toJS();
    const videos = this.props.doctor.get('videos').toJS();

    return (
      <div className="profile-tabs__media">
        <Collapse title={`Videos (${videos.length})`}>
          <VideoList limit={2} playerClassName="col-sm-6" videos={videos} />
        </Collapse>
        <Collapse title={`Images (${images.length})`}>
          <ImageList limit={2} imgClassName="col-sm-6" images={images} />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(MediaTabContent);
