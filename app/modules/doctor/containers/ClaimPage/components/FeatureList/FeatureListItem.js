import React from 'react';
import PropTypes from 'prop-types';

const FeatureListItem = ({ children }) => (
  <div className="claim-features__item">
    <div className="claim-features__item-icon">
      <i className="icon_check_alt" />
    </div>
    <div className="claim-features__item-text">
      {children}
    </div>
  </div>
);

FeatureListItem.propTypes = {
  children: PropTypes.node,
};

export default FeatureListItem;
