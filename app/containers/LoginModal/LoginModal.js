import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import LoginForm from 'modules/auth/containers/LoginForm';
import { makeSelectLoginModalShow } from './redux/selectors';
import { hideLoginModal } from './redux/actions';
import './style.scss';

class LoginModal extends Component {
  handleHide = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleHide}
        dialogClassName="login-modal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="login-modal">
            Sign In
          </Modal.Title>
          <Modal.Body>
            <LoginForm onSubmit={this.handleHide} />
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  show: makeSelectLoginModalShow(),
});

const mapDispatchToProps = {
  hideModal: hideLoginModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(LoginModal);
