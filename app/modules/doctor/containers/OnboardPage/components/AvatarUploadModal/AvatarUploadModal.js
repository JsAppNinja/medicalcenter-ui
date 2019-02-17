import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-bootstrap/lib/Modal';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/lib/Button';
import request from 'utils/request';
import { dataURItoBlob } from 'utils/file';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import {
  toggleAvatarModal,
  setAvatarImageUrl,
} from '../../redux/actions';
import {
  makeSelectAvatarUploadModalShow,
  makeSelectOnboardDoctorProfile,
} from '../../redux/selectors';

import './style.scss';

class AvatarUploadModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.doctor.get('photo_url') || null,
      isLoading: false,
      avatarScale: 1,
    };
  }

  onClickSave = () => {
    if (this.editor) {
      const { doctor } = this.props;
      const canvasScaledUrl = this.editor.getImageScaledToCanvas().toDataURL();
      const blob = dataURItoBlob(canvasScaledUrl);

      this.setState({ isLoading: true });
      request(`file/avatar?doctorID=${doctor.get('uuid')}`, 'POST', blob, false, true, true)
        .then((res) => {
          this.props.setAvatarImageUrl(res.url);
          this.handleHide();
        })
        .catch(() => {
          // @TODO handle error on avatar upload
          this.handleHide();
        });
    }
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  handleHide = () => {
    this.setState({ isLoading: false });
    this.props.toggleAvatarModal(false);
  }

  handleDrop = (files) => {
    this.setState({ image: files[0] });
  }

  handleSliderChange = (value) => {
    this.setState({
      avatarScale: value,
    });
  }

  render() {
    const { show } = this.props;
    const { image, isLoading, avatarScale } = this.state;
    let dropzoneRef;

    return (
      <Modal
        show={show}
        onHide={this.handleHide}
        dialogClassName="avatar-modal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="avatar-modal" className="avatar-modal__title">
            Edit Photo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropzone
            onDrop={this.handleDrop}
            disableClick
            className="avatar-modal__dropzone"
            accept="image/*"
            ref={(node) => { dropzoneRef = node; }}
          >
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.image}
              width={230}
              height={230}
              className="avatar-modal__editor"
              border={10}
              borderRadius={150}
              scale={avatarScale}
              crossOrigin="anonymous"
            />
          </Dropzone>
        </Modal.Body>
        <Modal.Footer>
          <p className="avatar-modal__label">Drag frame to adjust portrait</p>
          <Slider
            min={1}
            max={10}
            step={0.1}
            value={avatarScale}
            handleLabel=""
            tooltip={false}
            onChange={this.handleSliderChange}
          />
          <div className="avatar-modal__buttons">
            <Button
              onClick={() => { dropzoneRef.open(); }}
            >
              {image ? 'Upload a Different Photo' : 'Upload a Photo'}
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.onClickSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectAvatarUploadModalShow(),
  doctor: makeSelectOnboardDoctorProfile(),
});

const mapDispatchToProps = {
  toggleAvatarModal,
  setAvatarImageUrl,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(AvatarUploadModal);
