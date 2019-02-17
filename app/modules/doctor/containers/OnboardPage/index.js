import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import PageLoading from 'components/PageLoading';
import { makeSelectAuthUser, makeSelectAuthLoading } from 'modules/auth/redux/selectors';

import STEP from './components/SideProgressNavigation/STEP';
import SideProgressNavigation from './components/SideProgressNavigation';
import BasicInformation from './containers/BasicInformation';
import CarePackage from './containers/CarePackage';
import About from './containers/About';
import Qa from './containers/QA';
import Media from './containers/Media';
import Blog from './containers/Blog';
import Travel from './containers/Travel';

import reducer from './redux/reducers';
import saga from './redux/saga';

import {
  onboardDoctorProfileRequest,
  saveOnboardRequest,
} from './redux/actions';
import { makeSelectOnboardLoading, makeSelectOnboardSaving } from './redux/selectors';

import './style.scss';

class OnboardPage extends Component {
  componentWillMount() {
    this.props.getOnboardDoctorProfile(this.props.match.params.id);
  }

  handleSubmit = (formName, nextPath) => () => {
    this.props.saveRequest(this.props.match.params.id, formName, nextPath);
  }

  render() {
    const {
      isLoading,
      authLoading,
      // authUser,
    } = this.props;

    if (isLoading || authLoading) {
      return <PageLoading />;
    }

    const { id } = this.props.match.params;
    // if (!authUser || authUser.get('profileId') !== id) {
    //   return <Redirect to="/404" />;
    // }

    return (
      <div className="onboard-page">
        <SideProgressNavigation />
        <div className="onboard-page__container">
          <Switch>
            <Route
              exact
              path={`/onboarding/:id/${STEP[0].path}`}
              component={() => (
                <BasicInformation
                  onSubmit={this.handleSubmit('doctor-basic-info', STEP[1].path)}
                />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[1].path}`}
              component={() => (
                <CarePackage onSubmit={this.handleSubmit('doctor-bundles', STEP[2].path)} />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[2].path}`}
              component={() => (
                <About onSubmit={this.handleSubmit('doctor-about', STEP[3].path)} />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[3].path}`}
              component={() => (
                <Qa onSubmit={this.handleSubmit('doctor-qa', STEP[4].path)} />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[4].path}`}
              component={() => (
                <Media onSubmit={this.handleSubmit('doctor-media', STEP[5].path)} />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[5].path}`}
              component={() => (
                <Blog onSubmit={this.handleSubmit('doctor-blog', STEP[6].path)} />
              )}
            />
            <Route
              exact
              path={`/onboarding/:id/${STEP[6].path}`}
              component={() => (
                <Travel onSubmit={this.handleSubmit('doctor-travel', STEP[0].path)} />
              )}
            />
            <Route render={() => <Redirect to={`/onboarding/${id}/${STEP[0].path}`} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authUser: makeSelectAuthUser(),
  authLoading: makeSelectAuthLoading(),
  isLoading: makeSelectOnboardLoading(),
  isSaving: makeSelectOnboardSaving(),
});

const mapDispatchToProps = {
  saveRequest: saveOnboardRequest,
  getOnboardDoctorProfile: onboardDoctorProfileRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'onboard', saga, mode: DAEMON });
const withReducer = injectReducer({ key: 'onboard', reducer });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(OnboardPage);
