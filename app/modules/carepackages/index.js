import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withQuery from 'hocs/withQuery';
import injectSaga from 'utils/injectSaga';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import PageTitle from 'components/PageTitle';
import Container from 'components/Container';
import ContentHeading from 'components/ContentHeading';

import saga from './redux/saga';

import FilterBar from './containers/FilterBar';
import PackagesList from './containers/PackagesList';

class CarePackages extends Component {
  packageBreadCrumb() {
    return (
      <Breadcrumb.Item active>Packages</Breadcrumb.Item>
    );
  }

  jointBreadCrumb(match) {
    return (
      <React.Fragment>
        <LinkContainer to="/packages">
          <Breadcrumb.Item>Packages</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{match.params.joint}</Breadcrumb.Item>
      </React.Fragment>
    );
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <Container>
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            {match.params.joint ? this.jointBreadCrumb(match) : this.packageBreadCrumb()}
          </Breadcrumb>

          <PageTitle title="Care Packages" />

          <ContentHeading title="You are only a click away from the right care">
            Shop doctors based on transparent prices, validated outcomes, and unparalleled convenience.
          </ContentHeading>

          <FilterBar />
        </Container>
        <PackagesList />
      </div>
    );
  }
}

const withSaga = injectSaga({ key: 'carepackages', saga });

export default compose(
  withRouter,
  withSaga,
  withQuery('filters', {}),
)(CarePackages);
