import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Divider from 'components/Divider';
import history from 'browserHistory';

import {
  makeSelectOnboardSaving,
  makeSelectOnboardSaveError,
  makeSelectOnboardDoctorId,
} from '../../redux/selectors';

import './style.scss';

const PaddedDivider = styled(Divider)`
  margin: 40px 0 !important;
`;

class Footer extends Component {
  backToProfile = () => {
    const { uuid } = this.props;
    history.push(`/doctor/${uuid}`);
  }

  render() {
    const {
      handleSubmit,
      isLoading,
      apiError,
    } = this.props;
    return (
      <React.Fragment>
        <PaddedDivider />
        {apiError &&
        <Alert bsStyle="danger">
          {apiError}
        </Alert>}
        <div className="footer__buttons">
          <Button
            type="button"
            bsSize="lg"
            className="footer__button"
            onClick={this.backToProfile}
            disabled={isLoading}
          >
            Back to Profile
          </Button>
          <Button
            type="submit"
            bsStyle="primary"
            bsSize="lg"
            className="footer__button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectOnboardSaving(),
  apiError: makeSelectOnboardSaveError(),
  uuid: makeSelectOnboardDoctorId(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(Footer);
