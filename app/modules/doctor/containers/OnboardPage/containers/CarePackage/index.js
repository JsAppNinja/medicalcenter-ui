import React, { Component } from 'react';
import { connect } from 'react-redux';
import snakeCase from 'lodash/snakeCase';
import PackageList from './PackageList';
import AddPackage from './AddPackage';
import Footer from '../../components/Footer';
import './style.scss';

import { addPackage, editPackage } from '../../redux/actions';

class CarePackage extends Component {
  constructor() {
    super();
    this.state = {
      editPackageId: null,
    };
  }

  makePackageData(values) {
    const newData = {};
    const oldData = values.toJS();
    Object.keys(oldData).forEach((key) => {
      switch (key) {
        case 'discount':
        case 'minPrice':
        case 'maxPrice':
          newData[snakeCase(key)] = {
            currency: 'USD',
            fractional_unit: '00',
            unit: oldData[key],
          };
          break;
        default:
          newData[key] = oldData[key];
      }
    });
    return newData;
  }

  upsertBundle = (values) => {
    const { editPackageId } = this.state;
    const data = this.makePackageData(values);
    if (editPackageId === 'new') {
      this.props.addPackage({
        ...data,
        consult_price: data.min_price,
        total: {
          currency: 'USD',
          fractional_unit: '00',
          unit: 0,
        },
        tax: {
          currency: 'USD',
          fractional_unit: '00',
          unit: 0,
        },
      });
    } else {
      this.props.editPackage(editPackageId, data);
    }
    this.toggleEdit(null);
  }

  toggleEdit = (editPackageId) => {
    this.setState({ editPackageId });
  }

  render() {
    const {
      onSubmit,
    } = this.props;
    const { editPackageId } = this.state;

    return (
      <div className="onboarding__care">
        {editPackageId ?
          <AddPackage toggleEdit={this.toggleEdit} bundleId={editPackageId} onSubmit={this.upsertBundle} /> :
          <PackageList toggleEdit={this.toggleEdit} />
        }
        <Footer handleSubmit={onSubmit} />
      </div>
    );
  }
}


const mapDispatchToProps = {
  addPackage,
  editPackage,
};

const withConnect = connect(undefined, mapDispatchToProps);

export default withConnect(CarePackage);
