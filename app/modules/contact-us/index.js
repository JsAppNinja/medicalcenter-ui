import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import history from 'browserHistory';
import InfoModal from 'components/InfoModal';

import saga from './redux/saga';
import { contactRequest, contactReset } from './redux/actions';
import { makeSelectContactSent } from './redux/selectors';
import ContactForm from './containers/ContactForm';
import './style.scss';

class ContactUsPage extends Component {
  onClose = () => {
    this.props.resetModal();
    history.push('/');
  }

  render() {
    const { sendContact, sent, resetModal } = this.props;
    return (
      <div className="contact">
        <ContactForm onSubmit={sendContact} />
        <InfoModal
          show={sent}
          title="Thanks for contacting us!"
          buttonText="Back To Home"
          onClick={this.onClose}
          handleHide={resetModal}
        >
          We will get back to you as soon as possible.
        </InfoModal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sent: makeSelectContactSent(),
});

const mapDispatchToProps = {
  sendContact: contactRequest,
  resetModal: contactReset,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'contact', saga });

export default compose(
  withSaga,
  withConnect,
)(ContactUsPage);
