import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ContentHeading from 'components/ContentHeading';
import Container from 'components/Container';
import SpecialBlock from 'components/SpecialBlock';
import IntroContent from '../../components/IntroContent';
import ThumbItem from './components/ThumbItem';

import { makeSelectPreferredDoctorList } from '../RenderDoctors/redux/selectors';
import './style.scss';

const TitleBlock = styled.div`
  padding-top: 70px;
`;

class PainasOpportunity extends Component {
  contentBlock() {
    return (
      <Container>
        <TitleBlock className="bg-white">
          <ContentHeading title="Pain As An Opportunity">
            <div className="text-left">
              While pain and injury are setbacks in the short term, they can also be viewed as a long-term opportunity to begin a new chapter of your life toward a better you—through optimizing your range of motion, strength, posture, and fitness conditioning.
              We are here to connect you to the best care available when you need it most.
            </div>
          </ContentHeading>
        </TitleBlock>
      </Container>
    );
  }

  teamBlock() {
    const { preferredDoctors } = this.props;
    return (
      <div className="block team-block">
        <section className="content-block bg-white team-block__section">
          <Container>
            <div className="adventure-holder gallery-home-holder team-block__section-wrapper">
              <Row className="team-block__section-wrapper">
                <Col md={6} className="img-block">
                  <ul className="gallery-list gallery-with-icon">
                    {preferredDoctors.get('providers').slice(0, 6).map((item, index) => (
                      <ThumbItem
                        key={`item_${index}`}
                        doctor={item.get('doctor')}
                      />
                    ))}
                  </ul>
                </Col>
                <Col md={6}>
                  <div className="centered text-intro team-block__section-text">
                    <IntroContent title="GPS For Your Healthcare Navigation">
                      We all have been there: searching for care for ourselves and our loved ones yet feeling deeply frustrated at the lack of information and transparency when it comes to price and care quality.
                      We strongly believe that finding the care we need should not be reduced to trial and error.
                      That is why we created KangarooMD.
                      We are pioneering a completely new care model that enables top physicians to offer direct care to patients with full price transparency, empowering patients like you to easily compare physicians based on care quality, price, and convenience.
                      We are your GPS for healthcare navigation, and you are in the driver’s seat.
                      Teaming up together allows us to help you achieve your recovery goals and regain control of your life.
                    </IntroContent>
                    <Link
                      to="/services"
                      className="btnHome btn-info-sub btn-md btn-shadow radius"
                    >
                      Learn more
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  specialBlock() {
    return (
      <SpecialBlock className="mt-std" title="Need help to find what you need?">
        <Link to="/contact-us"><strong className="contact-text">Contact Us Now</strong></Link>
      </SpecialBlock>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.contentBlock()}
        {this.teamBlock()}
        {this.specialBlock()}
      </React.Fragment>
    );
  }
}

PainasOpportunity.propTypes = {
  preferredDoctors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  preferredDoctors: makeSelectPreferredDoctorList(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PainasOpportunity);
