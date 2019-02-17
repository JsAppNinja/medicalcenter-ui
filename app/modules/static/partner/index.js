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
import PartnerSection from 'components/PartnerSection';

import './style.scss';
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

class PartnerPage extends Component {
  handleShowPartnerModal = () => {
    this.props.togglePartnerModal(true);
  }

  renderIntro() {
    return (
      <Container>
        <ContentIntro className="content-intro">
          <ContentHeading title="GET YOURSELF READY FOR THE NEW HEALTHCARE CONSUMERS">
            <div className="text-left">
              You are an outstanding physician who is knowledgeable and caring with a good track record. You have been busy with patient care in clinics and surgery rooms.
              Do you know the percentage of patients who search online for doctors? Eight out of ten people search for doctors online, and the number is growing rapidly with time.
              The wave of healthcare consumerism is coming in your way at an accelerating speed.
              Are you ready to meet new healthcare consumers’ needs and remain competitive with your peer doctors?
              At KangarooMD, we partner with sharp medical minds like you to help you win in this new healthcare selection and stand on top of the new healthcare revolution.
            </div>
          </ContentHeading>

          <Row className="md-std">
            <IntroColumn icon="partner-spotlight" title="We Put You in the Spotlight">
              We have interviewed tens of thousands of patients and have developed a deep understanding of healthcare consumers’ needs. We help you organize your information to put your online presence into the spotlight.
              During this process, we work meticulously to ensure your success: if you do not already have cash rates for your care services, we help you analyze your data and establish cash rates to attract more cash-pay patients.
            </IntroColumn>
            <IntroColumn icon="partner-rois" title="Smarter Marketing with Measurable ROIs">
              In order to stay competitive in the new age of healthcare consumerism, marketing yourself and your practice becomes a necessity.
              As you sink lots of money into various sales channels, do you know how many prospective patients actually become your patients? Without knowing ROIs, you may be wasting your valuable resources that could have been better invested somewhere else.
              We help you with invaluable intelligence on your ROIs for each sales channel so you gain the biggest ROIs.
            </IntroColumn>
            <IntroColumn icon="partner-interactions" title="Seamless Patient Care Interactions">
              With more patients knocking on your doors, is your care team still able to catch up with all the logistics and operational tasks while being responsive to each patient’s inquiry? We understand the importance of patient communications with the care team directly, and thus we help turn your sales channels into automated workflows, automating time-consuming, tedious logistics tasks and patient touch points so that your care team has time to call patients and answer their questions.
              By joining hands with us, care is no longer a few disconnected dots, but a seamless line flowing through the entire care journey—from inquiry to recovery.
            </IntroColumn>
          </Row>
        </ContentIntro>
      </Container>
    );
  }

  renderExperience() {
    return (
      <Container>
        <ContentHeading title="YOUR CARE FLOW. MODERNIZED.">
          <div className="text-left">
            Do you wish to deliver 5-star customer service while expanding your patient care pipeline capacity to serve as many patients as possible?
            We help your dream come true by modernizing your care flow—from digital marketing to patient post-treatment surveys, from patient inquiry to recovery.
          </div>
        </ContentHeading>

        <div className="holder mt-std">
          <Row>
            <Col md={6}>
              <h3><strong>Maximize Your Care Team’s Operational Efficiency</strong></h3>
              <p>
                We help you automate your current care workflows in the clinic, providing an instant 10X+ boost to your care team’s operational efficiency, as though you are hiring an army of care coordinators who are error- free and work nonstop 24/7.
                This way, your current care team can take their heads out of the water and actually have time to communicate directly with patients, producing happier patients—which in turn attracts more patients into your clinic.
              </p>
            </Col>
            <Col md={6}>
              <h3><strong>Turn Your Patients into Your Advocates</strong></h3>
              <p>
                If you look at your current online reviews, you can easily spot two categories of patients: those who are too excited and those who are too frustrated.
                Over 98% of your patients—even though they get good care—leave without any comments. We see this as a golden opportunity to build a contagious referral engine using all your current patients’ positive care experiences.
                As our AI-assisted patient care application follows each patient throughout their care experience, we ensure that every patient is a happy patient.
                A patient logs his/her care experience in our care application and leaves positive reviews for you.
                We turn each of your happy patients into a spokesman for you and your care team. Just think of the total number of patients you treat in one year—we help you turn your patient populations into your contagious referral engine.
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
        <ContentHeading title="YOUR DEEP-TECH PARTNER">
          <div className="text-left">
            Our team is composed of top clinicians, scientists, and software ninjas.
            We join hands for our shared vision to empower physicians to offer high-quality direct care to patients without hassle—providing hundreds of millions of patients with care transparency and five-star customer service.
            We use our passion, our people, and our deep-tech platform to power your success.
          </div>
        </ContentHeading>
        <Row className="mt-std">
          <Col md={6}>
            <h3>Amazing support for all</h3>
            <p>
              We are your marketing team, your sales team, your patient success team, and your patient support team.
              With our people and our AI-powered technology platform, we help market your practice to attract more patients, auto-pilot your practice’s workflow and remote patient monitoring.
              That way you can focus on doing what you do best—delivering high-quality care and treatment.
              We strive to ensure your success in the healthcare consumer market.
            </p>
          </Col>
          <Col md={5} sm={6} className="progress-holder">
            <div className="bar-holder">
              <ProgressRating title="Payment Processing" now={99} />
              <ProgressRating title="Outcome Tracking" now={96} />
              <ProgressRating title="Customer Support" now={95} />
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

  renderPartnerSection() {
    return (
      <div>
        <Container>
          <ContentHeading title="PARTNER">
            People who always support and endorse our good work
          </ContentHeading>
        </Container>
        <PartnerSection />
      </div>
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
            <Breadcrumb.Item active>Partner</Breadcrumb.Item>
          </Breadcrumb>

          <PageTitle title="Partner with KangarooMD" />

          {this.renderIntro()}
          {this.renderExperience()}
        </Container>

        {this.renderFeatures()}
        {this.renderSupport()}

        <SpecialBlock
          className="mt-std"
          title="“AI will never replace providers. But the providers using AI will replace those who do not.”"
        >
        </SpecialBlock>

        {this.renderSecondaryFeatures()}
        {this.renderPartnerSection()}

      </React.Fragment>
    );
  }
}

export default PartnerPage;
