import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';

class MegaMenu extends Component {
  render() {
    const {
      to,
      title,
      id,
      children,
    } = this.props;

    return (
      <li className="mega-menu-parent has-child">
        <Link to={to}>{title}</Link>
        <div className="wrapper">
          <div className="mega-menu">
            <div id={id} className="nav-wrapper">
              <div className="container">
                <Row>
                  {children}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

MegaMenu.propTypes = {
  id: PropTypes.string,
  to: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node,
};

MegaMenu.defaultProps = {
  id: '',
  to: '/',
  title: '',
  children: null,
};

export default MegaMenu;
