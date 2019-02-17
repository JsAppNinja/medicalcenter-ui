import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/SvgIcon';

import './style.scss';

const TravelItem = ({ children, icon, title }) => (
  <div className="travel-item">
    <div className="travel-item__icon">
      <SvgIcon className="icon-mask size-87 fill-orange" icon={icon} />
    </div>
    <div className="travel-item__title">
      {title}
    </div>
    <div className="travel-item__content">
      {children}
    </div>
  </div>
);

TravelItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default TravelItem;
