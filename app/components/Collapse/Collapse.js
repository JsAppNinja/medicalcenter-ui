import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse as ReactCollapse } from 'react-collapse';
import cx from 'classnames';

import './style.scss';

class Collapse extends Component {
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
    const { title, children } = this.props;
    const { expanded } = this.state;
    const expandCN = cx('kcollapse__expander', 'fa', {
      'fa-caret-up': expanded,
      'fa-caret-down': !expanded,
    });
    const itemCN = cx('kcollapse', {
      'kcollapse--expanded': expanded,
    });

    return (
      <div className={itemCN}>
        <div className="kcollapse__header" onClick={this.onToggle}>
          <div className="kcollapse__title">
            {title}
          </div>
          <i className={expandCN} />
        </div>
        <div className="kcollapse__body">
          <ReactCollapse isOpened={expanded}>
            {children}
          </ReactCollapse>
        </div>
      </div>
    );
  }
}

Collapse.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Collapse;
