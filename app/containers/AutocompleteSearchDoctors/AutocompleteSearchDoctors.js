import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import VirtualSelect from 'components/VirtualSelect';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import { makeSelectAutocompleteKeywords } from './redux/selectors';
// import './style.scss';

class AutocompleteSearchDoctors extends Component {
  render() {
    const { keywords, value, onChange } = this.props;

    return (
      <div className="doctor-search">
        <i className="doctor-search__icon icon_search" />
        <VirtualSelect
          id="keyword-select"
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          placeholder="Search by Keyword..."
          autoFocus
          options={keywords.toJS()}
          simpleValue
          clearable
          value={value}
          onChange={onChange}
          searchable
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  keywords: makeSelectAutocompleteKeywords(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(AutocompleteSearchDoctors);
