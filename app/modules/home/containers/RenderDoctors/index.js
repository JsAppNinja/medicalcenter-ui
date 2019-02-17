import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CloudMap from './containers/CloudMap';
import SearchResults from './containers/SearchResults';
import FindTrustedPhysicians from './containers/FindTrustedPhysicians';
import PainasOpportunity from '../PainasOpportunity';

import { homeDoctorSearchRequest, homePreferredDoctorsRequest } from './redux/actions';

class RenderDoctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joint: null,
      zip: null,
      radius: null,
    };
  }

  componentWillMount() {
    const {
      joint,
      zip,
      radius,
    } = this.state;

    this.props.getDoctors({ joint, zip, radius });
    this.props.getPreferredDoctors();
  }

  render() {
    return (
      <React.Fragment>
        <div className="hero-section full-screen has-map has-sidebar">
          <div className="map-wrapper">
            <CloudMap />
          </div>
          <div className="results-wrapper">
            <FindTrustedPhysicians />
            <SearchResults />
          </div>
        </div>
        <PainasOpportunity />
      </React.Fragment>
    );
  }
}

RenderDoctors.propTypes = {
  getDoctors: PropTypes.func,
};

const mapDispatchToProps = {
  getDoctors: homeDoctorSearchRequest,
  getPreferredDoctors: homePreferredDoctorsRequest,
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(withConnect)(RenderDoctors);
