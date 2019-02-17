import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import ProfileOverviewComponent from 'components/ProfileOverviewComponent';
import Tags from 'components/Tags';
import Divider from 'components/Divider';

import { makeSelectAuthUser } from 'modules/auth/redux/selectors';
import { saveDoctorToList } from 'containers/SaveDoctorModal/redux/actions';
import { toggleSocialModal } from '../../../../../doctor/redux/actions';
import SocialShareModal from '../../../../../doctor/containers/SocialShareModal';

import './style.scss';

class DoctorModal extends Component {
  constructor() {
    super();

    this.state = {
      isSeeAllTags: false,
    };
  }

  handleShowSocialModal = () => {
    this.props.toggleSocialModal(true);
  }

  handleShowSaveDoctorModal = () => {
    const { doctor } = this.props;
    this.props.saveDoctorToList(doctor.get('uuid'), doctor.toJS());
  }

  handleTags = () => {
    this.setState({ isSeeAllTags: true });
  }

  render() {
    const { doctor, authUser } = this.props;
    const { isSeeAllTags } = this.state;
    return (
      <Modal bsSize="large" show onHide={this.props.handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="doctor-modal">
            <ProfileOverviewComponent
              profile={doctor}
              // TODO: Has to be updated
              advanced
              // advanced={doctor.get('paid')}
              // claimed={doctor.get('claimed')}
              authUser={authUser}
              handleShowSocialModal={this.handleShowSocialModal}
              handleShowSaveDoctorModal={this.handleShowSaveDoctorModal}
              pageLink={`/doctor/${doctor.get('uuid')}`}
              profileButtonTitle="Details"
            />
            <div className="doctor-modal__specialities">
              Specialities: {doctor.get('specialities') && doctor.get('specialities').join(', ')}
            </div>
            <Divider />
            <div className="doctor-modal__about">
              {doctor.get('about')}
            </div>
            <Divider />
            <div className="doctor-modal__procedures">
              <div className="doctor-modal__procedures-title">Top Procedures Performed({doctor.get('conditions_treated').size})</div>
              {!isSeeAllTags ?
                <div className="doctor-modal__procedures-contents">
                  <Tags tagItems={doctor.get('conditions_treated').slice(0, 3)} />
                  <div className="doctor-modal__procedures-moreread" onClick={this.handleTags}>
                    {doctor.get('conditions_treated').size > 0 &&
                      <span>See all {doctor.get('conditions_treated').size} procedures</span>
                    }
                  </div>
                </div> :
                <Tags tagItems={doctor.get('conditions_treated')} />
              }
            </div>
          </div>
        </Modal.Body>
        <SocialShareModal doctor={doctor} />
      </Modal>
    );
  }
}

DoctorModal.propTypes = {
  doctor: PropTypes.object,
  handleClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authUser: makeSelectAuthUser(),
});

const mapDispatchToProps = {
  toggleSocialModal,
  saveDoctorToList,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(DoctorModal);
