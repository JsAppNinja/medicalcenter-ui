import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Collapse } from 'react-collapse';

import './style.scss';

class QAItem extends Component {
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
    const { question, children } = this.props;
    const { expanded } = this.state;
    const expandCN = cx('qa-item__expander', 'fa', {
      'fa-caret-up': expanded,
      'fa-caret-down': !expanded,
    });
    const itemCN = cx('qa-item', {
      'qa-item--expanded': expanded,
    });

    return (
      <div className={itemCN}>
        <div className="qa-item__section qa-item__section--title" onClick={this.onToggle}>
          <div className="qa-item__label">
            Question:
          </div>
          <div className="qa-item__text">
            {question}
          </div>
          <i className={expandCN} />
        </div>
        <Collapse isOpened={expanded}>
          <div className="qa-item__section">
            <div className="qa-item__label">
              Answer:
            </div>
            <div className="qa-item__text">
              {children}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

QAItem.propTypes = {
  question: PropTypes.string,
  children: PropTypes.node,
};

export default QAItem;
