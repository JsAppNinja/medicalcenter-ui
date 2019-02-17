import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import { homeDoctorSearchRequest } from '../../redux/actions';
import { makeSelectSearchIsLoading } from '../../redux/selectors';

import './style.scss';

class FindTrustedPhysicians extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joint: '',
      zip: '',
      radius: '',
    };
  }

  onChangeState = (filed) => (evt) => {
    this.setState({ [filed]: evt.target.value });
  };

  handleSearchDoctors = (evt) => {
    const {
      joint,
      zip,
      radius,
    } = this.state;

    evt.preventDefault();
    if (joint || zip) {
      this.props.searchPhysicians({
        joint,
        zip,
        radius,
      });
    }
  };

  render() {
    return (
      <form className="form search-form inputs-underline custome-bg-gray-form" onSubmit={this.handleSearchDoctors}>
        <div className="section-title">
          <h3>Find Trusted Physicians</h3>
        </div>
        <FormGroup>
          <FormControl
            componentClass="select"
            className="selectpicker"
            placeholder="Affected Joint"
            onChange={this.onChangeState('joint')}
          >
            <option value="">Affected Joint</option>
            <option value="knee">Knee</option>
            <option value="hip">Hip</option>
            <option value="spine">Spine</option>
            <option value="shoulder">Shoulder</option>
          </FormControl>
        </FormGroup>
        <Row>
          <Col md={6} sm={6} className="form-zipcode">
            <FormControl
              type="text"
              value={this.state.zip}
              placeholder="Zip Code"
              onChange={this.onChangeState('zip')}
            />
          </Col>
          <Col md={6} sm={6}>
            <FormControl
              componentClass="select"
              className="selectpicker"
              placeholder="Radius"
              onChange={this.onChangeState('radius')}
            >
              <option value="">Radius</option>
              <option value="10">10 Miles</option>
              <option value="15">15 Miles</option>
              <option value="20">20 Miles</option>
              <option value="25">25 Miles</option>
              <option value="30">30 Miles</option>
            </FormControl>
          </Col>
        </Row>
        <FormGroup>
          <Button
            type="submit"
            bsStyle="primary"
            className="pull-right margin-3percent"
            disabled={this.props.isSearch}
          >
            <i className="fa fa-search" />
          </Button>
        </FormGroup>
      </form>
    );
  }
}

FindTrustedPhysicians.propTypes = {
  searchPhysicians: PropTypes.func,
  isSearch: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isSearch: makeSelectSearchIsLoading(),
});

const mapDispatchToProps = {
  searchPhysicians: homeDoctorSearchRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(FindTrustedPhysicians);
