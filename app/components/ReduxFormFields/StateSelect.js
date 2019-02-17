import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import { RegionDropdown } from 'react-country-region-selector';

class StateSelect extends Component {
  render() {
    const {
      id,
      input,
      label,
      meta: {
        error,
        touched,
        valid,
        invalid,
      },
      help,
    } = this.props;

    let validationState;

    if (touched) {
      if (valid) {
        validationState = 'success';
      } else if (invalid) {
        validationState = 'error';
      }
    }

    return (
      <FormGroup id={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <RegionDropdown
          {...input}
          country="US"
          countryValueType="short"
          valueType="short"
        />
        {help && <HelpBlock>{help}</HelpBlock>}
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default StateSelect;
