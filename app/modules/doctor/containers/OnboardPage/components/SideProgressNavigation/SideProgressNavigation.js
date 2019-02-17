import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import STEP from './STEP';

import './style.scss';

class SideProgressNavigation extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div className="onboard-sidenav" >
        {STEP.map((item, index) => (
          <NavLink
            key={`item_${index}`}
            to={`/onboarding/${id}/${item.path}`}
            className="onboard-sidenav__item"
            activeClassName="onboard-sidenav__item--active"
          >
            {item.text}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default withRouter(SideProgressNavigation);
