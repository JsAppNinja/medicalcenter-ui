import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Label from 'react-bootstrap/lib/Label';

import './PreferredProviderItem.scss';

class PreferredProviderItem extends Component {
  render() {
    const {
      uuid,
      price,
      specialties,
      name,
      address,
      photoUrl,
    } = this.props;

    return (
      <div className="item">
        <figure className="ribbon">Top</figure>
        <Link
          to={`/doctor/${uuid}`}
        >
          <div className="description description-custom">
            <figure>Consultations: {`$${price}`}</figure>
            <Label>{specialties}</Label>
            <h3>{name}</h3>
            <h4>{address}</h4>
          </div>
          <div className="image preferred-provider-item_bgimage bg-transfer" />
          <img
            src={photoUrl}
            alt="provider"
            className="preferred-provider-item_photo"
          />
        </Link>
        <div className="controls-more" />
      </div>
    );
  }
}

PreferredProviderItem.propTypes = {
  uuid: PropTypes.string,
  price: PropTypes.string,
  specialties: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  photoUrl: PropTypes.string,
};

PreferredProviderItem.defaultProps = {
  uuid: '',
  price: '',
  specialties: '',
  name: '',
  address: '',
  photoUrl: '',
};

export default PreferredProviderItem;
