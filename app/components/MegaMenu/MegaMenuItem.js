import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MegaMenuItem extends Component {
  render() {
    const {
      to,
      children,
    } = this.props;

    return (
      <li>
        <Link to={to}>{children}</Link>
      </li>
    );
  }
}

MegaMenuItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

MegaMenuItem.defaultProps = {
  to: '/',
  children: '',
};

export default MegaMenuItem;
