import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import './style.scss';

const AddCircleButton = ({
  onClick,
  iconName,
  buttonLabel,
}) => (
  <div className="add-circle-btn">
    <Button className="input-plus-btn" onClick={onClick}>
      <i className={`fa ${iconName} input-plus-btn__icon`} />
    </Button>
    <span className="add-circle-btn__label">
      {buttonLabel}
    </span>
  </div>
);

AddCircleButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddCircleButton;
