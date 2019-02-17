import React from 'react';
import PropTypes from 'prop-types';
import { getAddress } from 'utils/helpers';

const GetDirections = ({
  street,
  city,
  state,
  zip,
  children,
}) => {
  const address = getAddress({
    street,
    city,
    state,
    zip,
  });

  if (!address) {
    return null;
  }

  const url = `https://www.google.com/maps/dir/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <a target="_blank" href={url} className="btn btn-primary">
      {children}
    </a>
  );
};

GetDirections.propTypes = {
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  children: PropTypes.node,
};

GetDirections.defaultProps = {
  children: 'Get Directions',
};

export default GetDirections;
