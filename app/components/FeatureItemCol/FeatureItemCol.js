import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import SvgIcon from 'components/SvgIcon';

const FeatureItemCol = ({
  icon,
  title,
  children,
  color,
  ...otherProps
}) => (
  <Col {...otherProps}>
    <SvgIcon className={cx('icon-mask size-67', `fill-${color}`)} icon={icon} />
    <strong className="content-title">{title}</strong>
    <p>
      {children}
    </p>
  </Col>
);

FeatureItemCol.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

FeatureItemCol.defaultProps = {
  title: '',
  color: 'light-gray',
  icon: '',
};

export default FeatureItemCol;
