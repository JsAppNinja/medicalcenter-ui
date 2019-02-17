import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TravelItem from './components/TravelItem';
import TEXTS from './texts';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class TravelTabContent extends Component {
  render() {
    const { doctor } = this.props;
    const items = doctor.get('travels') && doctor.get('travels').size ? doctor.get('travels').toJS() : TEXTS;

    return (
      <div className="profile-tabs__travel">
        {items.map((item, index) => (
          <TravelItem key={`travel_item_${index}`} icon={item.icon} title={item.title}>
            {item.description}
          </TravelItem>
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(TravelTabContent);
