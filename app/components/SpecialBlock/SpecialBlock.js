import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cx from 'classnames';

const SpecialText = styled.p`
  line-height: normal;
`;

const SpecialBlock = ({
  title, children, className,
}) => (
  <div className={cx('special-block', className)}>
    <div className="container">
      <SpecialText className="special-text">
        <strong>{title}</strong>
      </SpecialText>
      <SpecialText className="special-body-text">
        {children}
      </SpecialText>

    </div>
  </div>
);

SpecialBlock.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

SpecialBlock.defaultProps = {
  title: '',
};

export default SpecialBlock;
