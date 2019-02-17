import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import SvgIcon from 'components/SvgIcon';

const VisibilityIcon = styled(SvgIcon)`
  position: absolute;
  cursor: pointer;
  right: 10px;
  height: 34px;
  width: 20px;
  top: 32px;
`;

const StyledFormGroup = styled(FormGroup)`
  position: relative;
`;

class Password extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

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
      type,
      help,
      ...props
    } = this.props;
    const { visible } = this.state;

    let validationState;

    if (touched) {
      if (valid) {
        validationState = 'success';
      } else if (invalid) {
        validationState = 'error';
      }
    }

    return (
      <StyledFormGroup id={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} {...input} type={visible ? type : 'password'} />
        <VisibilityIcon icon={visible ? 'eye-slash' : 'eye'} onClick={this.toggleVisibility} />
        {help && <HelpBlock>{help}</HelpBlock>}
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </StyledFormGroup>
    );
  }
}

Password.propTypes = {
  type: PropTypes.string,
};

Password.defaultProps = {
  type: 'text',
};

export default Password;
