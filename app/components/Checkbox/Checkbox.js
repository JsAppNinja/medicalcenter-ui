import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => undefined,
  }

  handleClick = () => {
    const { checked, onChange } = this.props;

    onChange(!checked);
  }

  render() {
    const { children, className, checked } = this.props;
    const checkboxCN = cx('kcheckbox', className, {
      'kcheckbox--checked': checked,
    });

    return (
      <div className={checkboxCN} onClick={this.handleClick}>
        <div className="kcheckbox__input" />
        <div className="kcheckbox__label">
          {children}
        </div>
      </div>
    );
  }
}

export default Checkbox;
