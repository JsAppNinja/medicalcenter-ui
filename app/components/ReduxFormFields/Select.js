import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const Select = ({
  id,
  input,
  label,
  preLabel,
  meta: {
    error,
    touched,
    valid,
    invalid,
  },
  help,
  options,
}) => {
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
      {label &&
        <ControlLabel>{label}</ControlLabel>
      }
      <div className={preLabel && 'onboard-container__form-preLabelSelect'}>
        {preLabel &&
          <ControlLabel className="onboard-container__form-preLabel">{preLabel}</ControlLabel>
        }
        <div className="onboard-container__form-dateselect">
          <FormControl {...input} componentClass="select">
            <option value="">Select...</option>
            {options.map((item, index) => (
              <option
                key={`item_${index}`}
                value={item}
              >{item}
              </option>
            ))}
          </FormControl>
          {help && <HelpBlock>{help}</HelpBlock>}
          {touched && error && <HelpBlock>{error}</HelpBlock>}
        </div>
      </div>

    </FormGroup>
  );
};

Select.propTypes = {
  preLabel: PropTypes.string,
};

Select.defaultProps = {
  preLabel: null,
};

export default Select;
