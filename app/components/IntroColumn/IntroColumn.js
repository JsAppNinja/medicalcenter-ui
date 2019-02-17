import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import SvgIcon from 'components/SvgIcon';

const Paragraph = styled.p`
  letter-spacing: 0.035em;
`;

const IntroColumn = ({
  icon, title, color, children,
}) => (
  <Col md={4}>
    <div className="text-center">
      <SvgIcon className={cx('icon-mask size-87', `fill-${color}`)} icon={icon} />
      <br />
      <br />
      <strong className="content-title">{title}</strong>
      <Paragraph className="text-left">
        {children}
      </Paragraph>
    </div>
  </Col>
);

IntroColumn.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

IntroColumn.defaultProps = {
  title: '',
  icon: '',
  color: 'gray',
};

export default IntroColumn;
