/*  eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import cx from 'classnames';
import 'video.js/dist/video-js.css'
import './style.scss';

class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, {
      ...this.props
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  setRef = (node) => {
    this.videoNode = node;
    if (this.props.setRef) {
      this.props.setRef(node);
    }
  }

  render() {
    const {
      className,
      sources,
    } = this.props;

    return (
      <div
        className={cx('video-player', className)}
      >
        <div data-vjs-player>
          <video poster={`${sources[0].thumb}?w=300`} ref={this.setRef} className="video-js vjs-16-9 vjs-big-play-centered" />
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  autoplay: PropTypes.bool,
  controls: PropTypes.bool,
  sources: PropTypes.array,
};

VideoPlayer.defaultProps = {
  autoplay: false,
  controls: true,
  sources: [],
};

export default VideoPlayer;
