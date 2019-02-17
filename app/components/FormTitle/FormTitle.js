import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from 'components/Divider';
import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 20px 0 !important;
`;

const FormTitle = ({
  title,
  hasButton,
  buttonTitle,
  onClick,
  btnClassName,
}) => (
  <React.Fragment>
    <div className="form-topbar">
      <div className="form-topbar__title">
        {title}
      </div>
      {hasButton &&
        <div className="form-topbar__button">
          <button className={btnClassName} onClick={onClick}>
            {buttonTitle}
          </button>
        </div>
      }
    </div>
    <PaddedDivider />
  </React.Fragment>
);


FormTitle.propTypes = {
  btnClassName: PropTypes.string,
};

FormTitle.defaultProps = {
  btnClassName: 'btn btn-primary',
};

export default FormTitle;
