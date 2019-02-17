import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import { initPackageListRequest } from '../../redux/actions';
import { makeSelectSearchIsLoading } from '../../redux/selectors';

import './style.scss';

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joint: props.match.params.joint,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.match.params.joint) {
      this.setState({ joint: '' });
    }
    if (this.props.match.params.joint !== nextProps.match.params.joint) {
      this.setState({ joint: nextProps.match.params.joint });
    }
  }

  componentWillUnmount() {
    this.props.initPackageList();
  }

  onChangeState = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  };

  onSearchPackages = (evt) => {
    this.props.initPackageList();
    const { joint } = this.state;
    evt.preventDefault();
    this.props.history.push(`/packages/${joint}`);
  }

  render() {
    return (
      <form className="form search-form" onSubmit={this.onSearchPackages}>
        <Row>
          <Col className="package_filterbar_colitem" md={3} sm={6}>
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

          <Col className="package_filterbar_colitem" md={3} sm={6}>
            <Button
              className="package_filterbar_colitem-button"
              type="submit"
              bsStyle="primary"
              bsSize="large"
              disabled={this.props.isSearch}
            >
              Find Best Package
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

FilterBar.propTypes = {
  isSearch: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isSearch: makeSelectSearchIsLoading(),
});

const mapDispatchToProps = {
  initPackageList: initPackageListRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(FilterBar);
