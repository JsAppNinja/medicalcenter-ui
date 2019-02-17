import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LoadableList from 'components/LoadableList';
import VideoPlayer from 'components/VideoPlayer';
import Modal from 'react-bootstrap/lib/Modal';
import Gallery from 'react-image-gallery';
import withQuery from 'hocs/withQuery';
import { toggleSocialModal } from '../../redux/actions';
import './style.scss';

class VideoList extends Component {
  constructor(props) {
    super(props);

    const videoIndex = props.queryVideoData;

    this.state = {
      show: props.boundQuery && !!videoIndex,
      startIndex: parseInt(videoIndex, 10) || 0,
      playIndex: -1,
    };
  }

  onSlide = (index) => {
    this.props.onVideoQueryChange(index);
    this.setState({ playIndex: -1 });
  }

  shareVideo = (index) => {
    this.props.toggleSocialModal(true, index);
  }

  toggleShowVideo = (index) => {
    this.setState({
      playIndex: index,
    });
  }

  handleShow = (startIndex) => {
    this.props.onVideoQueryChange(startIndex);
    this.setState({
      show: true,
      startIndex,
    });
  }

  handleHide = () => {
    this.props.onVideoQueryChange(undefined);
    this.setState({ show: false });
  }

  renderVideo = (item) => {
    const showVideo = this.state.playIndex === item.index;

    return (
      <div className="image-gallery-image">
        {
          showVideo ?
            <VideoPlayer sources={[{ src: item.videoSrc }]} autoplay />
            :
            <a className="video-list__item-back" onClick={() => this.toggleShowVideo(item.index)}>
              <div className="video-list__item-play">
                <i className="fa fa-play" />
              </div>
              <img src={item.original} alt="" />
              {
                item.description &&
                  <span className="image-gallery-description video-list__item-description">
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    const {
      videos,
      limit,
      playerClassName,
      className,
    } = this.props;

    const galleryVideos = videos.map((vid, index) => ({
      index,
      original: `${vid.thumb}?max-w=900&max-h=600&fit=crop`,
      originalTitle: vid.title,
      description: vid.title,
      thumbnail: `${vid.thumb}?max-w=150&max-h=150&fit=crop`,
      videoSrc: vid.src,
      renderItem: this.renderVideo,
    }));

    return (
      <div className={cx('video-list', className)}>
        <LoadableList
          className="row"
          limit={limit}
          btnText="Load More Videos"
          btnClassName="col-sm-12"
          items={videos}
        >
          {(item, index) => (
            <div key={`video_${index}`} className={cx('video-list__item', playerClassName)}>
              <div className="video-list__item-title">
                <a className="video-list__item-share" onClick={() => this.shareVideo(index)}>
                  <i className="icon_upload" />
                </a>
                {item.title}
              </div>
              <div
                className="video-list__item-thumb"
                style={{ backgroundImage: `url('${item.thumb}')` }}
                onClick={() => this.handleShow(index)}
              >
                <div className="video-list__item-play">
                  <i className="fa fa-play" />
                </div>
              </div>
            </div>
          )}
        </LoadableList>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="photo-viewer"
        >
          <Gallery
            items={galleryVideos}
            startIndex={this.state.startIndex}
            showPlayButton={false}
            onSlide={this.onSlide}
          />
        </Modal>
      </div>
    );
  }
}

VideoList.propTypes = {
  videos: PropTypes.array,
  limit: PropTypes.number,
  className: PropTypes.string,
  playerClassName: PropTypes.string,
};

const mapDispatchToProps = {
  toggleSocialModal,
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(
  withQuery('video'),
  withConnect,
)(VideoList);
