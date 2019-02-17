import React, { Component } from 'react';

class CustomToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    const { className } = this.props;

    return (
      <a className={className} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export default CustomToggle;
