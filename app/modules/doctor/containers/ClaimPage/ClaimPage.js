import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import history from 'browserHistory';

import InfoModal from 'components/InfoModal';
import ClaimForm from './containers/ClaimForm';
import FeatureList from './components/FeatureList';
import ClaimFooter from './components/Footer';
import reducer from './redux/reducers';
import saga from './redux/saga';
import { claimProfileRequest } from './redux/actions';
import { makeSelectDoctorProfile, makeSelectClaimed } from '../../redux/selectors';
import { toggleClaim } from '../../redux/actions';

class ClaimPage extends Component {
  componentWillMount() {
    this.props.resetClaimed(false);
  }

  onClose = () => {
    const { doctor } = this.props;
    history.push(`/doctor/${doctor.get('uuid')}`);
  }

  onClaimProfile = () => {
    const { doctor, claimProfile } = this.props;
    claimProfile(doctor.get('uuid'));
  }

  render() {
    const { claimed } = this.props;

    return (
      <div className="claim-page">
        <ClaimForm onSubmit={this.onClaimProfile} />
        <FeatureList>
          <FeatureList.Item>Enable patients to book appointments online</FeatureList.Item>
          <FeatureList.Item>Update clinic information</FeatureList.Item>
          <FeatureList.Item>Create care services </FeatureList.Item>
          <FeatureList.Item>Sell care products and services </FeatureList.Item>
          <FeatureList.Item>Respond to reviews</FeatureList.Item>
          <FeatureList.Item>Manage your KangarooMD presence from your phone</FeatureList.Item>
        </FeatureList>
        <ClaimFooter />
        <InfoModal
          show={claimed}
          title="Thanks for claiming profile!"
          buttonText="Back To Profile"
          onClick={this.onClose}
        >
          We will get back to you as soon as possible.
        </InfoModal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
  claimed: makeSelectClaimed(),
});

const mapDispatchToProps = {
  claimProfile: claimProfileRequest,
  resetClaimed: toggleClaim,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'claim', saga, mode: DAEMON });
const withReducer = injectReducer({ key: 'claim', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClaimPage);
