import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DatePicker from 'react-datepicker';
import omit from 'lodash/omit';
import 'react-datepicker/dist/react-datepicker.css';

const ReduxFormDatepicker = ({
  id,
  input,
  label,
  meta: {
    error,
    touched,
    valid,
    invalid,
  },
  dateFormat,
  disabledDays,
  futureOnly,
  help,
}) => {
  let validationState;

  if (touched) {
    if (valid) {
      validationState = 'success';
    } else if (invalid) {
      validationState = 'error';
    }
  }

  let val = input.value ? moment(input.value, dateFormat) : null;

  if (val && !val.isValid()) {
    val = null;
  }

  const filterDate = (d) => disabledDays.indexOf(moment(d).format('ddd')) === -1
    && (!futureOnly || !moment(d).isBefore(moment().startOf('day')));

  return (
    <FormGroup id={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <DatePicker
        {...omit(input, ['value'])}
        className="form-control"
        dateFormat={dateFormat}
        selected={val}
        filterDate={filterDate}
        autoComplete="off"
      />
      <FormControl.Feedback />
      {help && <HelpBlock>{help}</HelpBlock>}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

ReduxFormDatepicker.propTypes = {
  dateFormat: PropTypes.string,
  disabledDays: PropTypes.array,
};

ReduxFormDatepicker.defaultProps = {
  dateFormat: 'Do MMMM, YYYY',
  disabledDays: [],
};

export default ReduxFormDatepicker;
