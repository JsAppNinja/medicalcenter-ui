import React from 'react';
import PropTypes from 'prop-types';
import FeatureListItem from './FeatureListItem';
import './style.scss';

const FeatureList = ({ children }) => (
  <div className="claim-features">
    <div className="claim-features__title">
      Free Tools for Physicians on KangarooMD
    </div>
    <div className="claim-features__subtitle">
      Join 1,000+ accredited Healthcare Providers already partnered with us!
    </div>
    <div className="claim-features__content">
      {children}
    </div>
  </div>
);

FeatureList.propTypes = {
  children: PropTypes.node,
};

FeatureList.Item = FeatureListItem;

export default FeatureList;
