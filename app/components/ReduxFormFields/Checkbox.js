import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from '../Checkbox';

const ReduxFormCheckbox = ({
  id,
  input,
  label,
}) => (
  <FormGroup id={id}>
    <Checkbox checked={!!input.value} onChange={input.onChange}>
      {label}
    </Checkbox>
  </FormGroup>
);

export default ReduxFormCheckbox;
