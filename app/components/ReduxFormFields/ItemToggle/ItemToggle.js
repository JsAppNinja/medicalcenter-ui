import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import AddCircleButton from 'components/AddCircleButton';
import cx from 'classnames';

import './style.scss';

class ItemToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items || [],
      addLabel: '',
    };
  }

  handleClick = (toggledValue) => () => {
    const { input: { value, onChange } } = this.props;

    if (value.find((item) => item === toggledValue)) {
      onChange(value.filter((item) => item !== toggledValue));
    } else {
      onChange(value.push(toggledValue));
    }
  }

  handleAdd = () => {
    const { items, addLabel } = this.state;

    if (!items.find((item) => item === addLabel)) {
      this.setState({
        items: [...items, addLabel],
        addLabel: '',
      });
    }
  }

  handleChangeInput = (e) => {
    this.setState({ addLabel: e.target.value });
  }

  render() {
    const {
      input: {
        value,
      },
      meta: {
        error,
        submitFailed,
      },
      hasAdd,
      placeholder,
    } = this.props;
    const { items, addLabel } = this.state;
    return (
      <div>
        {items.map((item, index) => (
          <div
            key={`item_${index}`}
            className={cx('item-toggle', {
              'item-toggle--active': !!(value || []).find((v) => v === item),
            })}
            onClick={this.handleClick(item)}
          >
            {item}
          </div>
        ))}
        {hasAdd &&
          <div className="item-toggle__addlabel">
            <div className="item-toggle__addlabel-input">
              <FormControl
                type="text"
                value={addLabel}
                placeholder={placeholder}
                onChange={this.handleChangeInput}
              />
            </div>
            <AddCircleButton
              idx={1}
              iconName="fa-plus"
              onClick={this.handleAdd}
            />
          </div>}
        {submitFailed && error && <span>{error}</span>}
      </div>
    );
  }
}

export default ItemToggle;
