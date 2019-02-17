import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FormTitle from 'components/FormTitle';
import { createStructuredSelector } from 'reselect';
import { confirm } from 'utils/modals';

import PackageItem from './PackageItem';
import { makeSelectOnboardDoctorProfile } from '../../../redux/selectors';
import { removePackage } from '../../../redux/actions';

import './style.scss';

class PackageList extends Component {
  addPackage = () => {
    this.props.toggleEdit('new');
  }

  editPackage = (bundleId) => {
    this.props.toggleEdit(bundleId);
  }

  removePackage = (index) => {
    confirm({
      title: 'Are you sure you want to remove this bundle?',
      okLabel: 'Yes',
      cancelLabel: 'No',
    }).then(() => {
      this.props.removePackage(index);
    }).catch(() => {});
  }

  render() {
    const { doctor } = this.props;

    return (
      <div className="existing-package">
        <FormTitle title="Existing Care Packages" hasButton buttonTitle="Add a New Care Package" onClick={this.addPackage} />
        {doctor.get('bundles').map((bundle, index) => (
          <PackageItem
            key={bundle.get('uuid') + index}
            bundle={bundle}
            editPackage={() => this.editPackage(bundle.get('uuid'))}
            removePackage={() => this.removePackage(index)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectOnboardDoctorProfile(),
});


const mapDispatchToProps = {
  removePackage,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PackageList);
