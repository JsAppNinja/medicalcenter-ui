import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Container from 'components/Container';
import ContentHeading from 'components/ContentHeading';

import PackageItem from './components/PackageItem';
import CounterItem from './components/CounterItem';
import IntroContent from '../../components/IntroContent';

import packageData from './PopularCarePackagesData';

import './style.scss';

class PopularCarePackages extends Component {
  sectionTitle() {
    return (
      <aside className="count-block title-block">
        <Container>
          <ContentHeading title="POPULAR CARE PACKAGES">
            Outpatient Procedures with High Success Rates
          </ContentHeading>
        </Container>
      </aside>
    );
  }

  packageItems() {
    return (
      <div className="content-block content-spacing content-block-custom">
        <Container>
          <div className="content-holder">
            <Row className="db-3-col">
              {packageData.map((packageItem, index) => (
                <PackageItem key={index} carepackage={packageItem} />
              ))}
            </Row>
          </div>
        </Container>
      </div>
    );
  }

  counterBlock() {
    return (
      <aside className="count-block count-block-custom">
        <div className="container-fluid">
          <Row>
            <CounterItem
              blockNumber="block-1"
              imgClassname="sprite physician"
              number="4078"
              text="PHYSICIANS"
            />
            <CounterItem
              blockNumber="block-2"
              imgClassname="sprite nurse"
              number="1527"
              text="PHYSICAL THERAPISTS"
            />
            <CounterItem
              blockNumber="block-3"
              imgClassname="sprite medical-center"
              number="538"
              text="SURGERY CENTERS"
            />
            <CounterItem
              blockNumber="block-4"
              imgClassname="sprite patient-care"
              number="8362"
              text="PATIENT CARE EPISODES"
            />
          </Row>
        </div>
      </aside>
    );
  }

  featuredContent() {
    return (
      <Grid fluid>
        <Row className="video-section">
          <Col md={6} className="video-section__video">
            <iframe title="This is a bio-future video" width="560" height="315" className="video-section__video-content" src="https://www.youtube.com/embed/DL0_gcP15Ts" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
          </Col>
          <Col md={6} className="video-section__text">
            <div className="video-section__text-content">
              <IntroContent title="Biological Approach for Joint Replacement">
                Biologic treatments stimulate natural tissue healing,
                working to enhance the body’s own repair process. It is a
                natural alternative to total knee replacement surgery. The
                program has permitted hundreds of people with moderate to
                severe arthritis to stay active and delay or avoid a total
                knee replacement.
              </IntroContent>
              <Link to="/packages" className="btn btn-primary btn-lg btn-custom">
                EXPLORE
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="video-section">
          <Col md={6} className="video-section__text">
            <div className="video-section__text-content">
              <IntroContent title="Robotic Assisted Joint Replacements">
                Studies suggest that robotic joint surgery offers advantages over non-robotic procedures.
                The robots help doctors with pre-surgical planning and precisely control certain aspects of the surgery.
                It empowers doctors with the ability to customize joint replacement surgeries for each patient’s individual anatomy, helping to increase joint surgery success rates.
              </IntroContent>
              <Link to="/packages" className="btn btn-primary btn-lg btn-custom">
                EXPLORE
              </Link>
            </div>
          </Col>
          <Col md={6} className="video-section__video">
            <iframe title="This is a bio-future video" width="560" height="315" className="video-section__video-content" src="https://www.youtube.com/embed/fdXwhJbXV48?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
          </Col>
        </Row>
      </Grid>
    );
  }

  browseBlock() {
    return (
      <div className="browse-block">
        <div className="browse-care-types column">
          <Link to="/packages">
            <span>BROWSE BY CARE TYPES</span>
          </Link>
        </div>
        <div className="browse-providers column">
          <Link to="/doctors">
            <span>BROWSE BY PROVIDERS</span>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.sectionTitle()}
        {this.packageItems()}
        {this.counterBlock()}
        {this.featuredContent()}
        {this.browseBlock()}
      </React.Fragment>
    );
  }
}

export default PopularCarePackages;
