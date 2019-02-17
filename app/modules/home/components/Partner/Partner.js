import React, { Component } from 'react';
import Container from 'components/Container';
import ContentHeading from 'components/ContentHeading';
import PartnerSection from 'components/PartnerSection';

class Partner extends Component {
  render() {
    return (
      <div>
        <Container>
          <ContentHeading title="Partner">
            People who always support and endorse our good work
          </ContentHeading>
        </Container>
        <PartnerSection />
      </div>
    );
  }
}

export default Partner;
