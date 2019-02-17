import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import AddCircleButton from 'components/AddCircleButton';
import './style.scss';

class TagInput extends Component {
  constructor() {
    super();
    this.state = {
      tag: '',
    };
  }

  handleSelectChange = (value) => {
    this.setState({ tag: value });
  }

  handleAddTag = () => {
    const { tag } = this.state;
    const { value, onChange } = this.props.input;
    if (!value.includes(tag)) {
      onChange(value.push(tag));
    }
  }

  handleDelete = (tagToDelete) => {
    const { onChange, value } = this.props.input;
    onChange(value.filter((v) => v !== tagToDelete));
  }

  render() {
    const {
      label,
      items,
      input: {
        value,
      },
      placeholder,
      meta: {
        touched,
        error,
        submitFailed,
      },
    } = this.props;

    const { tag } = this.state;
    return (
      <div className="ktag-input">
        <ControlLabel className="ktag-input__label">{label}</ControlLabel>
        {(touched || submitFailed) && error && <span>{error}</span>}
        {(value || []).map((item, index) => (
          <div key={`${item}_${index}`} className="ktag-input__item" onClick={() => this.handleDelete(item)}>
            <div className="ktag-input__item-content">
              {item}
            </div>
            <i className="fa fa-minus-circle ktag-input__remove-icon" />
          </div>
        ))}
        <div className="ktag-input__input">
          <div className="ktag-input__form">
            <Select
              className="ktag-input__input-selector"
              onChange={this.handleSelectChange}
              options={items}
              placeholder={placeholder}
              simpleValue
              value={tag}
              labelKey="id"
              valueKey="title"
            />
          </div>
          <AddCircleButton
            idx={1}
            iconName="fa-plus"
            onClick={this.handleAddTag}
          />
        </div>
      </div>
    );
  }
}

export default TagInput;
