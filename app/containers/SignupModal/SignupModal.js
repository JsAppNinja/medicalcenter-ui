import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import SignupForm from 'modules/auth/containers/SignupForm';
import { makeSelectSignupModalShow } from './redux/selectors';
import { hideSignupModal } from './redux/actions';
import './style.scss';

class SignupModal extends Component {
  handleHide = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleHide}
        dialogClassName="signup-modal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="signup-modal">
            Sign Up
          </Modal.Title>
          <Modal.Body>
            <SignupForm onSubmit={this.handleHide} />
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  show: makeSelectSignupModalShow(),
});

const mapDispatchToProps = {
  hideModal: hideSignupModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SignupModal);
