import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DoctorItem from './components/DoctorItem';

import { makeSelectDoctorList, makeSelectHoverDoctorId } from '../../redux/selectors';

import './style.scss';

class SearchResults extends Component {
  render() {
    const { doctors, hoverDoctorId } = this.props;
    let hoverClassName = '';
    return (
      <div className="results custom-results">
        <div className="section-title">
          <h2>
            Search Results
            <span className="results-number">
              {doctors.get('providers').size}
            </span>
          </h2>
        </div>
        {doctors.get('providers').map((doctor) => {
          if (doctor.getIn(['doctor', 'uuid']) === hoverDoctorId) {
            hoverClassName = 'doctor-set-hover';
          } else {
            hoverClassName = '';
          }
          return (
            <DoctorItem
              key={doctor.getIn(['doctor', 'uuid'])}
              doctor={doctor.get('doctor')}
              hoverDoctorClassName={hoverClassName}
            />
          );
        })}
      </div>
    );
  }
}

SearchResults.propTypes = {
  doctors: PropTypes.object,
  hoverDoctorId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  doctors: makeSelectDoctorList(),
  hoverDoctorId: makeSelectHoverDoctorId(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SearchResults);
