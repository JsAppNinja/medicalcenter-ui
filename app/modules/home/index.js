import React, { Component } from 'react';
import { compose } from 'redux';

import TopProviders from 'containers/TopProviders';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './redux/reducers';
import saga from './redux/saga';

import RenderDoctors from './containers/RenderDoctors';
import PopularCarePackages from './containers/PopularCarePackages';
import Partner from './components/Partner';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <RenderDoctors />
        <PopularCarePackages />
        <TopProviders isRenderToHome />
        <Partner />
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
)(HomePage);
