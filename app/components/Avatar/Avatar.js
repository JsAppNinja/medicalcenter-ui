import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import PaidBadge from 'images/icons/paid-badge.png';
import PlaceholderImg from 'images/avatar-0.png';
import AnonymousPhoto from '../AnonymousPhoto';
import PaidPopup from './PaidPopup';
import './style.scss';

const Avatar = ({
  src,
  name,
  paid,
  size,
}) => {
  const overlay = (
    <Popover id="paid-popup">
      <PaidPopup name={name} />
    </Popover>
  );

  const avatarCN = cx('avatar', `avatar--${size}`);

  return (
    <div className={avatarCN}>
      <div className="avatar__img" style={{ backgroundImage: `url('${src}'), url('${AnonymousPhoto}')` }} />
      {paid && size === 'lg' &&
        <OverlayTrigger trigger="click" placement="bottom" overlay={overlay} rootClose>
          <img src={PaidBadge} className="avatar__badge" alt="badge" />
        </OverlayTrigger>}
    </div>
  );
};

Avatar.propTypes = {
  paid: PropTypes.bool,
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
};

Avatar.defaultProps = {
  src: PlaceholderImg,
  name: '',
  paid: false,
  size: 'lg',
};

export default Avatar;
