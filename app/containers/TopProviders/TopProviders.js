import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { saveDoctorToList } from 'containers/SaveDoctorModal/redux/actions';
import ContentHeading from 'components/ContentHeading';

import TopProviderItem from './TopProviderItem';
import './style.scss';

import { topProvidersRequest } from './redux/actions';
import { makeSelectTopProvidersList } from './redux/selectors';

class TopProviders extends Component {
  componentWillMount() {
    this.props.getDoctors();
  }

  render() {
    const { doctors, addDoctor, isRenderToHome } = this.props;
    return (
      <div className={`top-providers ${isRenderToHome ? 'home-top-providers container' : undefined}`}>
        {isRenderToHome ?
          <ContentHeading title="Top Providers">
            Our collection of the most popular providers in {moment().format('YYYY')}
          </ContentHeading> :
          <div className="top-providers__title">Top Providers</div>
        }
        <div className="top-providers__content">
          {doctors.map((doctor) => (
            <div className={isRenderToHome ? 'col-sm-3 col-xs-6' : undefined} key={doctor.getIn(['doctor', 'uuid'])}>
              <TopProviderItem
                key={doctor.getIn(['doctor', 'uuid'])}
                doctor={doctor.get('doctor')}
                addDoctor={() => addDoctor(doctor.getIn(['doctor', 'uuid']), doctor.get('doctor'))}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

TopProviders.propTypes = {
  getDoctors: PropTypes.func,
  doctors: PropTypes.object,
  isRenderToHome: PropTypes.bool,
};

TopProviders.defaultProps = {
  isRenderToHome: false,
};

const mapStateToProps = createStructuredSelector({
  doctors: makeSelectTopProvidersList(),
});

const mapDispatchToProps = {
  getDoctors: topProvidersRequest,
  addDoctor: saveDoctorToList,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TopProviders);
