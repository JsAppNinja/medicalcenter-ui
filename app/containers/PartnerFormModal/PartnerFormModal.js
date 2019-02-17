import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'browserHistory';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import InfoModal from 'components/InfoModal';

import AvatarImg from 'images/avatar.png';

import reducer from './redux/reducers';
import saga from './redux/saga';
import PartnerForm from './PartnerForm';

import { partnerInfoRequest, partnerInfoReset, togglePartnerModal } from './redux/actions';
import { makeSelectPartnerInfoSent, makeSelectPartnerModalShow } from './redux/selectors';

import './style.scss';

class PartnerFormModal extends Component {
  componentWillMount() {
    this.props.resetForm('partner-form');
  }

  onClose = () => {
    this.props.resetModal();
    history.push('/');
  }

  handleHide = () => {
    this.props.togglePartnerModal(false);
  }

  render() {
    const { partnerInfoSend, sent, resetModal } = this.props;
    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          onHide={this.handleHide}
          dialogClassName="modal-partner"
        >
          <Modal.Header closeButton closeLabel="&#x4d;">
            <div className="avatar">
              <img src={AvatarImg} alt="Avatar" />
            </div>
            <Modal.Title id="partner-form-modal">
              Partner with Us
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PartnerForm onSubmit={partnerInfoSend} />
          </Modal.Body>
          <Modal.Footer>
            we respond to all inquiries within 24 hrs
          </Modal.Footer>
        </Modal>
        <InfoModal
          show={sent}
          title="Thanks for contacting us!"
          buttonText="Back To Home"
          onClick={this.onClose}
          handleHide={resetModal}
        >
          We will reach out as soon as possible.
        </InfoModal>
      </React.Fragment>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  sent: makeSelectPartnerInfoSent(),
  show: makeSelectPartnerModalShow(),
});

const mapDispatchToProps = {
  partnerInfoSend: partnerInfoRequest,
  resetForm: reset,
  resetModal: partnerInfoReset,
  togglePartnerModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'partner', saga });
const withReducer = injectReducer({ key: 'partner', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PartnerFormModal);
