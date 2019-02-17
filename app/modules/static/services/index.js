import React, { Component } from 'react';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageTitle from 'components/PageTitle';
import ContentHeading from 'components/ContentHeading';
import Container from 'components/Container';
import IntroColumn from 'components/IntroColumn';
import FeatureItemCol from 'components/FeatureItemCol';
import ProgressRating from 'components/ProgressRating';
import SpecialBlock from 'components/SpecialBlock';
import RecentViewedDoctors from 'containers/RecentViewedDoctors';

import TEXTS from './texts';

const ContentIntro = styled.div`
  margin: 100px 0 40px 0;
`;

const FeatureBlock = styled.div`
  margin: 100px 0 60px 0;
`;

const SecondaryFeatureBlock = styled.div`
  margin-bottom: 40px;
`;

class ServicesPage extends Component {
  renderIntro() {
    return (
      <Container>
        <ContentIntro className="content-intro">
          <ContentHeading title="You’ll be you. Only Better">
            We don’t settle for just getting you back on your feet.
            Our goal is to get you back stronger, faster, and more fit than you were before you had pain.
          </ContentHeading>

          <Row className="md-std">
            <IntroColumn icon="service-top-doctors" title="Top Doctors" color="orange">
              When you’re facing a critical medical decision – whether it’s an important health question or a serious diagnosis – getting it right is everything.
              We make sure you can get it right. KangarooMD connects you to more than 50,000 musculoskeletal expert physicians.
              As a result, you can be confident that you have the right information, the right diagnosis, and the right treatment.
              These top doctors can help you with everything from minor pain management to major issues like severe arthritis and need knee replacement surgeries.
              We enable you to benefit from the world’s best medical minds either in the clinic or online, no matter where you are.
            </IntroColumn>
            <IntroColumn icon="service-prices" title="Transparent Prices" color="orange">
              Most of us take prices into consideration when making a purchase decision.
              However, up to this point, healthcare has been the exception, with a significant lack of transparency when it comes to care prices.
              At KangarooMD, we are growing the world’s largest provider network with full cost transparency.
              You are able to compare doctors based on prices, convenience, and care quality and make an informed decision—without surprising bills after treatments.
            </IntroColumn>
            <IntroColumn icon="service-appointments" title="Instant Appointments" color="orange">
              Have you called clinics and been put on hold? Have you left voicemails and never gotten a call back?
              Through KangarooMD’s Instant Appointment©, you can now book appointments online within a few simple clicks—without all the previous frustration and hassle.
              Our goal is to enable top doctors to provide you and hundreds of millions of patients the modern and seamless care experience that everyone dreams of having.
            </IntroColumn>
          </Row>
        </ContentIntro>
      </Container>
    );
  }

  renderExperience() {
    return (
      <Container>
        <ContentHeading title="KNOW YOUR DOCTORS BEFORE YOU MEET THEM">
          <div className="text-left">
            As you read through each doctor’s biography and try to compare them, do you feel frustrated that all doctors may seem alike on paper?
            Instead of leaving you wondering what the doctor is like, we bring you up close with each top doctor: you will understand their treatment process, care philosophy, consultation price, post-op follow-up process, etc. as if you are getting a free consultation.
            Your common questions are answered before you contact doctors in KangarooMD.
            We help you make a smart, informed decision to choose the best medical mind that is an ideal fit for your care needs.
          </div>
        </ContentHeading>
        <p>*KangarooMD doctors are doctors recommended by KangarooMD/KangarooHealth, and they are not employed by KangarooMD/KangarooHealth in any manner.</p>

        <div className="holder mt-std">
          <Row>
            <Col md={6}>
              <h3><strong>One-Stop Shop for Your Musculoskeletal Care Needs</strong></h3>
              <p>
                No more bouncing from place to place. Our top doctors’ expertise covers all major orthopedic joints you may have concerns with, such as back (spine), knee, hip, and shoulder.
                You no longer have to guess a doctor’s bedside manner, the numbers on your medical bills, and when you can get an appointment.
                KangarooMD is your one-stop shop to get to know the doctors of your interest, their care prices, and whenever you are ready, get an appointment instantly—it’s a breeze.
              </p>
            </Col>
            <Col md={6}>
              <h3><strong>Be Seen as a Whole Person</strong></h3>
              <p>
                Our top providers promise that you’re more than just an “injury” and you will be seen as a whole person.
                They always take a holistic approach to reducing your pain and healing your joints, including mind, body, and spirit advice.
                This care journey from pain to recovery is an opportunity to establish a new chapter of your life as a stronger, healthier, and more fit version of you.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

  renderFeatures() {
    return (
      <FeatureBlock className="orange-block mt-std">
        <Container>
          {TEXTS.primaryFeatures.map((row, index) => (
            <Row key={`row_${index}`}>
              {row.map((feature) => (
                <FeatureItemCol key={feature.title} className="margin-bottom-20px" md={4} color="light-gray" icon={feature.icon} title={feature.title}>
                  {feature.description}
                </FeatureItemCol>
              ))}
            </Row>
          ))}
        </Container>
      </FeatureBlock>
    );
  }

  renderSupport() {
    return (
      <Container className="mt-std">
        <ContentHeading title="FOCUS ON YOU">
          KangarooMD doctors’ dedication to patients is the secret weapon behind their success.
        </ContentHeading>
        <Row className="mt-std">
          <Col md={6}>
            <h3>Start with Why</h3>
            <p>
              For a long time, patients have been treated as victims of the healthcare system. Patients in pain and agony often feel trapped in an unfortunate situation—lost and hopeless. We pause and ask a simple question: healthcare accounts for a significant portion of everyone’s life, so why does something so essential to our existence offer such a bad customer service experience? Now with patients being the 3rd largest payors of all healthcare spending, we aim to empower patients with all the information and ammunition they need to make an informed care decision and the customer service they deserve. To win in this new healthcare revolution, we bring top medical minds to partner with us. When we send patients to these doctors working on the front lines, KangarooMD doctors promise to deliver 5-star customer service to make you feel at home, get your questions answered, and take care of you in a timely manner.
              You will be a happy customer, a new patient advocate who is willing to share your care stories to inspire more patients near and far.
            </p>
          </Col>
          <Col md={5} sm={6} className="progress-holder">
            <div className="bar-holder">
              <ProgressRating title="Care Quality" now={98} />
              <ProgressRating title="Travel / Lodging Arrangement" now={95} />
              <ProgressRating title="Recovery Support" now={99} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  renderSecondaryFeatures() {
    return (
      <SecondaryFeatureBlock className="content-block features">
        <Container>
          {TEXTS.secondaryFeatures.map((row, index) => (
            <Row key={`row_${index}`}>
              {row.map((feature) => (
                <FeatureItemCol key={feature.title} className="margin-bottom-40px" sm={6} md={3} color="powdered-steel" icon={feature.icon} title={feature.title}>
                  {feature.description}
                </FeatureItemCol>
              ))}
            </Row>
          ))}
        </Container>
      </SecondaryFeatureBlock>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Services</Breadcrumb.Item>
          </Breadcrumb>

          <PageTitle title="Our Services" />

          {this.renderIntro()}
          {this.renderExperience()}
        </Container>

        {this.renderFeatures()}
        {this.renderSupport()}

        <SpecialBlock className="mt-std" title="You Can Act NOW">
          You don’t have to live with your pain and wait until it’s time for a joint replacement.
        </SpecialBlock>

        {this.renderSecondaryFeatures()}

        <RecentViewedDoctors />
      </React.Fragment>
    );
  }
}

export default ServicesPage;
