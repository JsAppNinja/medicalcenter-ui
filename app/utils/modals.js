import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { confirmable, createConfirmation } from 'react-confirm';

const ConfirmModal = ({
  okLabel,
  cancelLabel,
  title,
  message,
  show,
  proceed,
  dismiss,
  cancel,
  enableEscape,
}) => (
  <Modal
    show={show}
    onHide={dismiss}
    backdrop={enableEscape ? true : 'static'}
    dialogClassName="confirm-modal"
  >
    <Modal.Header closeButton closeLabel="&#x4d;">
      <Modal.Title>
        {title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {message}
    </Modal.Body>
    <Modal.Footer>
      <Button bsSize="large" onClick={cancel}>{cancelLabel}</Button>
      &nbsp;&nbsp;
      <Button bsSize="large" bsStyle="primary" onClick={proceed}>{okLabel}</Button>
    </Modal.Footer>
  </Modal>
);

ConfirmModal.defaultProps = {
  proceed: () => undefined,
  cancel: () => undefined,
  dismiss: () => undefined,
  okLabel: 'Okay',
  cancelLabel: 'Cancel',
  show: false,
  enableEscape: true,
};

ConfirmModal.propTypes = {
  proceed: PropTypes.func, // called when ok button is clicked.
  cancel: PropTypes.func, // called when cancel button is clicked.
  dismiss: PropTypes.func, // called when backdrop is clicked or escaped.

  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  show: PropTypes.bool,
  enableEscape: PropTypes.bool,
};

export const confirm = createConfirmation(confirmable(ConfirmModal));
