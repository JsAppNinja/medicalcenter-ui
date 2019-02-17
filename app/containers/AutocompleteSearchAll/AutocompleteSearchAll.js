import React, { Component } from 'react';
import cx from 'classnames';
import Select from 'react-select';
import history from 'browserHistory';
import 'react-select/dist/react-select.css';
import './style.scss';

class AutocompleteSearchAll extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
    };
  }

  onChange = (keyword) => {
    if (!keyword) {
      this.setState({ keyword });
      return;
    }
    this.setState({ keyword });
    switch (keyword.type) {
      case 'provider':
        history.push(`/doctor/${keyword.uuid}`);
        break;
      case 'bundle':
        history.push(`/packages/filter/${keyword.title}`);
        break;
      default:
        break;
    }
  }

  onSearch = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`/api/quick-search?keyword=${input}`)
      .then((response) => response.json())
      .then((data) => ({ options: data }));
  }

  render() {
    const { className } = this.props;
    return (
      <div className={cx('top-search', className)}>
        <i className="top-search__icon icon_search" />
        <Select.Async
          valueKey="uuid"
          labelKey="title"
          multi={false}
          value={this.state.keyword}
          onChange={this.onChange}
          loadOptions={this.onSearch}
          placeholder="Search by Keyword..."
        />
      </div>
    );
  }
}

export default AutocompleteSearchAll;
