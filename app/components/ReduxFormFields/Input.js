import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import './input.scss';

const Input = ({
  id,
  input,
  label,
  nextLabel,
  meta: {
    error,
    touched,
    valid,
    invalid,
  },
  help,
  isHorizontal,
  labelWidth,
  controlWidth,
  className,
  isDisable,
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

  const feedbackCN = cx({
    'has-nextlabel__feedback': !!nextLabel,
    'has-no-label__feedback': !label,
  });

  return (
    <React.Fragment>
      {!isHorizontal ?
        <FormGroup id={id} validationState={validationState}>
          <ControlLabel className={!label && 'form-no-label'}>{label}</ControlLabel>
          {nextLabel ?
            <div className="has-nextlabel">
              <FormControl {...props} {...input} className="has-nextlabel__input" />
              <div className="has-nextlabel__label">{nextLabel}</div>
            </div> :
            <FormControl {...props} {...input} disabled={isDisable} />
          }
          <FormControl.Feedback className={feedbackCN} />
          {help && <HelpBlock>{help}</HelpBlock>}
          {touched && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup> :

        <FormGroup id={id} validationState={validationState}>
          <Col componentClass={ControlLabel} sm={labelWidth}>
            {label}
          </Col>
          <Col sm={controlWidth} className={className}>
            <FormControl {...props} {...input} disabled={isDisable} />
            <FormControl.Feedback className={className} />
            {help && <HelpBlock>{help}</HelpBlock>}
            {touched && error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>
      }
    </React.Fragment>

  );
};

Input.propTypes = {
  isDisable: PropTypes.bool,
};

Input.defaultProps = {
  isDisable: false,
};

export default Input;
