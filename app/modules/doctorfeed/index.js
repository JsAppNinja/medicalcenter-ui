import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import PageTitle from 'components/PageTitle';
import Container from 'components/Container';
import withQuery from 'hocs/withQuery';
import injectSaga from 'utils/injectSaga';
import saga from './redux/saga';

import FilterBar from './containers/FilterBar';
import DoctorFeedList from './containers/DoctorFeedList';

class DoctorFeed extends Component {
  doctorBreadCrumb() {
    return (
      <Breadcrumb.Item active>Doctors</Breadcrumb.Item>
    );
  }

  jointBreadCrumb(match) {
    return (
      <React.Fragment>
        <LinkContainer to="/doctors">
          <Breadcrumb.Item>Doctors</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{match.params.joint}</Breadcrumb.Item>
      </React.Fragment>
    );
  }

  render() {
    const { match, queryFiltersData, onFiltersQueryChange } = this.props;
    return (
      <div>
        <Container>
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            {match.params.joint ? this.jointBreadCrumb(match) : this.doctorBreadCrumb()}
          </Breadcrumb>
          <PageTitle title="Find Your Doctor" />
          <FilterBar
            updateQuery={onFiltersQueryChange}
            filters={queryFiltersData}
            joint={match.params.joint}
          />
        </Container>
        <DoctorFeedList />
      </div>
    );
  }
}

const withSaga = injectSaga({ key: 'doctorfeed', saga });

export default compose(
  withRouter,
  withSaga,
  withQuery('filters', {}),
)(DoctorFeed);
