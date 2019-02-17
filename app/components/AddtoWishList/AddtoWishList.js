import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';

import './AddtoWishList.scss';

const AddtoWishList = ({ pos }) => {
  const overlay = (
    <Popover className="custom-popover" id="control-more">
      <div className="control-item">Add to favorites</div>
      <div className="control-item">Add to watchlist</div>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="focus" placement={pos} overlay={overlay}>
      <div className="controls-more" />
    </OverlayTrigger>
  );
};

AddtoWishList.propTypes = {
  pos: PropTypes.string,
};

AddtoWishList.defaultProps = {
  pos: 'left',
};

export default AddtoWishList;
