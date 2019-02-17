import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';

class MegaSubMenu extends Component {
  render() {
    const { title, children, ...otherProps } = this.props;
    return (
      <Col {...otherProps}>
        <h4 className="heading">{title}</h4>
        <ul>
          {children}
        </ul>
      </Col>
    );
  }
}

MegaSubMenu.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
};

MegaSubMenu.defaultProps = {
  children: null,
  title: '',
};

export default MegaSubMenu;
