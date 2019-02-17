import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CareServiceItem from '../../components/CareServiceItem';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class CareServicesTabContent extends Component {
  render() {
    const { doctor, advanced } = this.props;
    const bundles = advanced ? doctor.get('bundles') : doctor.get('bundles').slice(0, 2);

    return (
      <div className="profile-tabs__care-service">
        {bundles.map((bundle, index) => (
          <CareServiceItem
            key={`bundle_${index}`}
            bundle={bundle.toJS()}
            doctorID={doctor.get('uuid')}
          />
        ))}

        <div className="profile-tabs__care-service__example">
          *Financing examples:
          <br /><br />
          Subject to credit approval. APR: 6.99% subject to increase or decrease.
          Examples: 36 monthly payments for well-qualified applicant.
          All loan estimates above are based on an annual percentage rate of 6.99% for a 3 year loan.
          We offers loans from lenders for as low as 6.99% APR for well-qualified applicants but the
          rate you qualify for will depend upon your financial information and the underwriting
          criteria of the lending partners, so rates will vary. Monthly payments may be reduced by
          requesting a loan with a longer pay-off period. Parasail lenders offer loan terms up to 5 years.
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(CareServicesTabContent);
