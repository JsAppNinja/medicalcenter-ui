import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const TextField = ({
  id,
  input,
  label,
  placeholder,
  meta: {
    error,
    touched,
    valid,
    invalid,
  },
  labelWidth,
  isDisable,
  help,
  ...props
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
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} {...input} componentClass="textarea" rows={4} placeholder={placeholder} disabled={isDisable} />
      {help && <HelpBlock>{help}</HelpBlock>}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default TextField;
