import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import PageLoading from 'components/PageLoading';

import saga from './redux/saga';
import { doctorProfileRequest } from './redux/actions';
import {
  makeSelectDoctorProfileLoading,
  makeSelectDoctorIsPaid,
} from './redux/selectors';
import AdvancedProfile from './containers/AdvancedProfile';
import BasicProfile from './containers/BasicProfile';
import ClaimPage from './containers/ClaimPage';
import CheckoutPage from './containers/Checkout';
import CheckoutSuccessPage from './containers/CheckoutSuccess';

class Doctor extends Component {
  componentWillMount() {
    this.props.getDoctorProfile(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.getDoctorProfile(nextProps.match.params.id);
    }
  }

  render() {
    const { isPaid, isLoading, match } = this.props;

    if (isLoading) {
      return <PageLoading />;
    }

    if (isPaid) {
      return (
        <Switch>
          <Route exact path={match.url} component={AdvancedProfile} />
          <Route exact path={`${match.url}/checkout/:bundleUUID`} component={CheckoutPage} />
          <Route exact path={`${match.url}/checkout-success/:bundleUUID/:transactionId`} component={CheckoutSuccessPage} />
          <Route render={() => <Redirect to={match.url} />} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route exact path={match.url} component={BasicProfile} />
        <Route exact path={`${match.url}/claim`} component={ClaimPage} />
        <Route exact path={`${match.url}/checkout/:bundleUUID`} component={CheckoutPage} />
        <Route exact path={`${match.url}/checkout-success/:bundleUUID/:transactionId`} component={CheckoutSuccessPage} />
        <Route render={() => <Redirect to={match.url} />} />
      </Switch>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectDoctorProfileLoading(),
  isPaid: makeSelectDoctorIsPaid(),
});

const mapDispatchToProps = {
  getDoctorProfile: doctorProfileRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'doctor', saga });

export default compose(
  withRouter,
  withConnect,
  withSaga,
)(Doctor);
