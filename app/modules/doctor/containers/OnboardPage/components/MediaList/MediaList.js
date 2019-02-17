import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Dropzone from 'react-dropzone';
import VideoPlayer from 'components/VideoPlayer';
import Photo from 'components/Photo';
import AddCircleButton from 'components/AddCircleButton';
import { confirm } from 'utils/modals';

import MediaUploadModal from '../MediaUploadModal';
import './style.scss';

class MediaList extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      file: null,
      videoIndexToPlay: null,
    };
  }

  onHideModal = () => {
    this.setState({ file: null, showModal: false });
  }

  onDrop = (files) => {
    this.setState({ file: files[0], showModal: true });
  }

  handleMediaRemove = (index) => {
    const { removeMedia, type } = this.props;
    confirm({
      title: `Are you sure you want to remove this ${type}?`,
      okLabel: 'Yes',
      cancelLabel: 'No',
    }).then(() => {
      removeMedia(type, index);
    }).catch(() => {});
  }

  handleVideoPlay = (idx) => () => {
    this.setState({ videoIndexToPlay: idx });
  }

  render() {
    const { type, sources } = this.props;
    const { file, showModal, videoIndexToPlay } = this.state;

    return (
      <Row>
        {sources.map((item, index) => (
          <Col sm={4} key={`item_${index}`}>
            <div className="media-item">
              {type === 'video' &&
                <div className="media-item__wrapper">
                  {videoIndexToPlay === index ?
                    <VideoPlayer
                      sources={[item]}
                      className="media-item__video"
                      autoplay
                    /> :
                    <div className="media-item__thumb" onClick={this.handleVideoPlay(index)}>
                      <Photo
                        src={`${item.thumb}?w=300`}
                        className="media-item__image"
                      />
                      <div className="video-list__item-play"><i className="fa fa-play"></i></div>
                    </div>
                  }
                </div>
              }
              {type === 'image' &&
                <Photo
                  src={item.src}
                  className="media-item__image"
                />
              }
              <i
                className="fa fa-trash media-remove"
                onClick={() => this.handleMediaRemove(index)}
              />
              <div className="media-item__text">
                <div className="media-item__text-title">
                  <strong>{item.title}</strong>
                </div>
                <div className="media-item__text-date">
                </div>
              </div>
            </div>
          </Col>
        ))}
        <Col sm={4}>
          <Dropzone
            onDrop={this.onDrop}
            accept={`${type}/*`}
            className="media-item__dropzone"
          >
            <div className="media-item__dropzone-text">
              <AddCircleButton iconName="fa-plus" />
              <div className="media-item__dropzone-label1">Upload {type}</div>
              <div className="media-item__dropzone-label2">Or drag &amp; drop {type} files</div>
            </div>
          </Dropzone>
        </Col>
        <MediaUploadModal
          type={type}
          file={file}
          show={showModal}
          onHide={this.onHideModal}
          onSubmit={() => undefined}
        />
      </Row>
    );
  }
}

MediaList.propTypes = {
  sources: PropTypes.array,
};

export default MediaList;
