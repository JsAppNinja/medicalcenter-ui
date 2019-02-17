import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import {
  doctorFeedSearchRequest,
  initDoctorListRequest,
} from '../../redux/actions';
import { makeSelectSearchIsLoading } from '../../redux/selectors';

import './FilterBar.scss';

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: props.filters.keyword || '',
      joint: props.filters.joint || '',
      zip: '',
      radius: props.filters.radius || 25,
    };
  }

  onChangeState = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  };

  onSearchDoctors = (evt) => {
    this.props.initDoctorList();
    const {
      joint,
      zip,
      radius,
      keyword,
    } = this.state;

    evt.preventDefault();
    this.props.updateQuery({
      joint: this.state.joint,
      keyword: this.state.keyword,
      zip: this.state.zip || undefined,
      radius: this.state.radius,
    });
    this.props.searchDoctorFeed({
      joint, zip, radius, keyword,
    }, true);
  };

  render() {
    return (
      <form className="form search-form" onSubmit={this.onSearchDoctors}>
        <Row>
          <Col className="doctor-feed-colitem search-form__keyword" md={3}>
            <i className="search-form__keyword-icon icon_search" />
            <FormControl
              type="text"
              value={this.state.keyword}
              placeholder="Search By Keyword"
              onChange={this.onChangeState('keyword')}
            />
          </Col>
          <Col className="doctor-feed-colitem" md={2}>
            <FormControl
              componentClass="select"
              placeholder="Joint"
              value={this.state.joint}
              onChange={this.onChangeState('joint')}
            >
              <option value="">All</option>
              <option value="knee">Knee</option>
              <option value="hip">Hip</option>
              <option value="spine">Spine</option>
              <option value="shoulder">Shoulder</option>
            </FormControl>
          </Col>
          <Col className="doctor-feed-colitem" md={2}>
            <FormControl
              type="text"
              value={this.state.zip}
              placeholder="Zip Code"
              onChange={this.onChangeState('zip')}
            />
          </Col>
          <Col className="doctor-feed-colitem" md={2}>
            <FormControl
              componentClass="select"
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
          <Col className="doctor-feed-colitem" md={2}>
            <Button
              className="doctor-feed-colitem__button"
              type="submit"
              bsStyle="primary"
              bsSize="large"
              disabled={this.props.isSearch}
            >
              Find Best Care
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

FilterBar.propTypes = {
  searchDoctorFeed: PropTypes.func,
  isSearch: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isSearch: makeSelectSearchIsLoading(),
});

const mapDispatchToProps = {
  searchDoctorFeed: doctorFeedSearchRequest,
  initDoctorList: initDoctorListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withRouter,
  withConnect,
)(FilterBar);
