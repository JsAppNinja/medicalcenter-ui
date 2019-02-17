import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Collapse } from 'react-collapse';

import './style.scss';

class MobileTabItem extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  onToggle = (e) => {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;
    const expandCN = cx('fa', {
      'fa-caret-up': expanded,
      'fa-caret-down': !expanded,
    });
    const toggledCN = cx('profile-tabsview__mobile-item', {
      'profile-tabsview__mobile-item__toggled': expanded,
    });
    const {
      title,
      children,
    } = this.props;

    return (
      <div>
        <div onClick={this.onToggle} className={toggledCN}>
          {title} <i className={expandCN} />
        </div>
        <Collapse isOpened={expanded}>
          {children}
        </Collapse>
      </div>
    );
  }
}

MobileTabItem.propTypes = {
  title: PropTypes.string,
};

export default MobileTabItem;
