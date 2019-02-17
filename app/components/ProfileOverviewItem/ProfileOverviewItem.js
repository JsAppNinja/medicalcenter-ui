import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/SvgIcon';
import './style.scss';

const ProfileOverviewItem = ({ icon, isSvg, children }) => (
  <div className="profile-overview__item">
    {isSvg
      ? <SvgIcon icon={icon} className="profile-overview__item-icon" />
      : <i className={`icon_${icon} profile-overview__item-icon`} />
    }
    <div className="profile-overview__item-text">
      {children}
    </div>
  </div>
);

ProfileOverviewItem.propTypes = {
  icon: PropTypes.string,
  isSvg: PropTypes.bool,
  children: PropTypes.node,
};

ProfileOverviewItem.defaultProps = {
  isSvg: false,
};

export default ProfileOverviewItem;
