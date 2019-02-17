import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import VideoThumbnail from 'react-video-thumbnail';
import ReduxFormFields from 'components/ReduxFormFields';
import Request from 'superagent';
import { isRequired } from 'utils/redux-form-validators';
import { dataURItoBlob } from 'utils/file';
import request from 'utils/request';

import { addMedia } from '../../redux/actions';
import { makeSelectOnboardDoctorProfile } from '../../redux/selectors';

import './style.scss';

class MediaUploadModal extends Component {
  constructor() {
    super();

    this.state = {
      thumbnail: null,
    };
  }

  handleThumbnail = (thumbnail) => {
    this.setState({ thumbnail });
  }

  handleUpload = (fileType, file) => {
    const { doctor } = this.props;
    return request(`file/${fileType}?doctorID=${doctor.get('uuid')}`, 'POST', file, false, true, true);
  }

  handleSave = (values) => {
    const { doctor } = this.props;
    const title = values.get('title');
    const featured = values.get('featured');
    const { type, file } = this.props;
    const { thumbnail } = this.state;

    // upload image
    if (type === 'image') {
      return this.handleUpload(type, file)
        .then((res) => {
          this.props.addMedia(type, {
            src: res.url,
            title,
          });
          this.handleHide();
        });
    }

    // upload video
    if (!thumbnail) {
      throw new SubmissionError({
        _error: 'Thumbnail not ready',
      });
    }

    const blob = dataURItoBlob(thumbnail);
    const formDataBlob = new FormData();
    formDataBlob.append('file', blob, blob.name === 'blob' || !blob.name ? 'image.jpg' : blob.name);
    const formDataVideo = new FormData();
    formDataVideo.append('file', file, file.name === 'blob' || !file.name ? 'image.jpg' : file.name);

    return Promise.all([
      Request.post(`/api/file/videothumb?doctorID=${doctor.get('uuid')}`)
        .set({})
        .send(formDataBlob)
        .on('progress', (e) => {
          console.log('thumb Progress', e);
        }),
      Request.post(`/api/file/video?doctorID=${doctor.get('uuid')}`)
        .set({})
        .send(formDataVideo)
        .on('progress', (e) => {
          Request.post(`/api/file/video?doctorID=${doctor.get('uuid')}`).end();
          console.log('Progress', e);
        }),
    ])
      .then((results) => {
        const thumbUrl = results[0].body.url;
        const videoUrl = results[1].body.url;
        this.props.addMedia(type, {
          title,
          src: videoUrl,
          thumb: thumbUrl,
          featured: featured ? 1 : 0,
        });
        this.handleHide();
      });


    // return Promise.all([this.handleUpload('videothumb', blob), this.handleUpload(type, file)])
    //   .then((results) => {
    //     const thumbUrl = results[0].url;
    //     const videoUrl = results[1].url;

    //     this.props.addMedia(type, {
    //       title,
    //       src: videoUrl,
    //       thumb: thumbUrl,
    //       featured: featured ? 1 : 0,
    //     });
    //     this.handleHide();
    //   });
  }

  handleHide = () => {
    this.setState({ thumbnail: null });
    this.props.onHide();
    this.props.initialize({
      title: '',
      featured: false,
    });
  }

  render() {
    const {
      show,
      type,
      file,
      submitting,
      handleSubmit,
    } = this.props;

    if (!file) {
      return null;
    }

    return (
      <Modal
        show={show}
        onHide={this.handleHide}
        dialogClassName="add-service-modal"
        bsSize="lg"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="add-service-modal" className="service-modal__title">
            Upload new {type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="upload-item">
            <Col sm={4}>
              {type === 'video' &&
                <iframe
                  title="This is a video to uplaod"
                  width="560"
                  height="315"
                  className="upload-item__video"
                  src={file.preview}
                  frameBorder="0"
                  allow="encrypted-media"
                />
              }
              {type === 'image' &&
                <img
                  src={file.preview}
                  alt="UploadImage"
                  className="upload-item__image"
                />
              }
            </Col>
            <Col sm={8}>
              <Form onSubmit={handleSubmit(this.handleSave)}>
                <Field
                  name="title"
                  component={ReduxFormFields.Input}
                  type="text"
                  placeholder="Title"
                  validate={[isRequired]}
                />

                {type === 'video' &&
                  <Field
                    name="featured"
                    component={ReduxFormFields.Checkbox}
                    label="Featured"
                  />}
              </Form>

              {type === 'video' &&
                <Row>
                  <Col sm={4}>
                    <div className="upload-item__thumbnail">
                      <VideoThumbnail
                        videoUrl={file.preview}
                        snapshotAtTime={2}
                        thumbnailHandler={this.handleThumbnail}
                      />
                    </div>
                  </Col>
                </Row>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            bsSize="lg"
            disabled={submitting}
            onClick={handleSubmit(this.handleSave)}
          >
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectOnboardDoctorProfile(),
});

const mapDispatchToProps = {
  addMedia,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'media-upload-form',
  })
)(MediaUploadModal);
