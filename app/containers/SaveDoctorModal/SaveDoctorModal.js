import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import Modal from 'react-bootstrap/lib/Modal';
import DoctorPreview from 'components/DoctorPreview';

import saga from './redux/saga';
import {
  makeSelectDoctorSaveModalShow,
  makeSelectSessionId,
  makeSelectDoctorSaveModalDoctors,
} from './redux/selectors';
import {
  hideSaveDoctorModal,
  removeDoctorFromList,
  createWishlist,
  getWishlist,
} from './redux/actions';
import './style.scss';

class SaveDoctorModal extends Component {
  componentWillMount() {
    if (!this.props.sessionId) {
      this.props.initialize();
    } else {
      this.props.getDoctors();
    }
  }

  handleHide = () => {
    this.props.hideModal();
  }

  handleRemove = (uuid) => {
    this.props.removeDoctor(uuid);
  }

  renderDoctorPreview(doctor) {
    return (
      <div className="save-doctor-modal__item" key={doctor.get('uuid')}>
        <DoctorPreview
          simplified
          name={doctor.get('name')}
          title={doctor.get('title') || 'Orthopedic Surgeon'}
          photo={`${doctor.get('photo_url')}?w=150`}
          lowestPrice={doctor.get('lowest_consultation_price')}
          experience={doctor.get('experience') || 10}
          rating={doctor.get('rating') || '5.0'}
          uuid={doctor.get('uuid')}
          reviewCount={doctor.get('review_list').size}
        />
        <i
          className="icon_heart save-doctor-modal__item-save"
          onClick={() => this.handleRemove(doctor.get('uuid'))}
        />
      </div>
    );
  }

  render() {
    const { doctors } = this.props;
    const doctorRenderer = [];

    doctors.forEach((doctor) => {
      doctorRenderer.push(this.renderDoctorPreview(doctor));
    });

    return (
      <Modal
        show={this.props.show}
        onHide={this.handleHide}
        dialogClassName="save-doctor-modal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="save-doctor-modal">
            Save to List
          </Modal.Title>
          <Modal.Body>
            <div className="save-doctor-modal__preview">
              {!doctorRenderer.length &&
                <div className="save-doctor-modal__text">
                  No physician added to the list yet.
                </div>
              }
              {doctorRenderer}
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  show: makeSelectDoctorSaveModalShow(),
  doctors: makeSelectDoctorSaveModalDoctors(),
  sessionId: makeSelectSessionId(),
});

const mapDispatchToProps = {
  hideModal: hideSaveDoctorModal,
  removeDoctor: removeDoctorFromList,
  getDoctors: getWishlist,
  initialize: createWishlist,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'saveDoctorModal', saga });

export default compose(
  withConnect,
  withSaga,
)(SaveDoctorModal);
