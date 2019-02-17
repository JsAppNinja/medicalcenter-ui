import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavigationBar from 'containers/NavigationBar';
import Footer from 'containers/Footer';
import NotFound from 'containers/NotFound';
import SaveDoctorModal from 'containers/SaveDoctorModal';
import LoginModal from 'containers/LoginModal';
import SignupModal from 'containers/SignupModal';
import PartnerFormModal from 'containers/PartnerFormModal';
import ScrollToTop from 'components/ScrollToTop';

import HomePage from 'modules/home';
import Doctor from 'modules/doctor';
import DoctorFeed from 'modules/doctorfeed';
import CarePackages from 'modules/carepackages';
import ServicesPage from 'modules/static/services';
import PartnerPage from 'modules/static/partner';
import TermsOfUsePage from 'modules/static/terms-of-use';
import PrivacyPolicyPage from 'modules/static/privacy-policy';
import HipaaAuthorizationPage from 'modules/static/hipaa-authorization';
import CookiePolicyPage from 'modules/static/cookie-policy';
import DeliveryPolicyPage from 'modules/static/delivery-policy';
import RefundPolicyPage from 'modules/static/refund-policy';
import AcceptablePolicy from 'modules/static/acceptable-policy';
import AdditionalTerms from 'modules/static/additional-terms';
import ContactUsPage from 'modules/contact-us';
import OnboardPage from 'modules/doctor/containers/OnboardPage';

import withAuthentication from 'hocs/withAuthentication';

import injectSaga from 'utils/injectSaga';

import saga from './redux/saga';

class App extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <Helmet titleTemplate="%s - KangarooMD" defaultTitle="KangarooMD">
          <meta name="description" content="KangarooMD is an intelligent healthcare consumer shopping engine. It empowers millions of patients to search, compare doctors and book appointments online based on prices, care quality, and convenience. Check transparent care prices, read patient reviews, and get questions answered about orthopedic surgery and treatment options for your joints such as back, knee, hip, and shoulder. See what other patients have to say about their care journey and results. Easily find a trusted top doctor for your care needs and book appointments instantly, and more – all at KangarooMD." />
          <meta name="keywords" content="orthopedic surgeons, orthopedic surgery, book appointments, healthcare consumer shopping engine" />
          <meta property="og:site_name" content="KangarooMD" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.kangaroomd.com" />
          <meta property="og:title" content="KangarooMD" />
          <meta property="og:description" content="KangarooMD is an intelligent healthcare consumer shopping engine. It empowers millions of patients to search, compare doctors and book appointments online based on prices, care quality, and convenience. Check transparent care prices, read patient reviews, and get questions answered about orthopedic surgery and treatment options for your joints such as back, knee, hip, and shoulder. See what other patients have to say about their care journey and results. Easily find a trusted top doctor for your care needs and book appointments instantly, and more – all at KangarooMD." />
          <meta property="og:image" content="/logo-1200x630.png" />
        </Helmet>
        <header id="page-header">
          <NavigationBar />
        </header>
        <div id="page-content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/doctor/:id" component={Doctor} />
            <Route exact path="/doctors/:joint" component={DoctorFeed} />
            <Route exact path="/doctors/package/:name" component={DoctorFeed} />
            <Route exact path="/doctors" component={DoctorFeed} />
            <Route path="/onboarding/:id" component={OnboardPage} />
            <Route exact path="/packages" component={CarePackages} />
            <Route exact path="/packages/:joint" component={CarePackages} />
            <Route exact path="/packages/filter/:keyword" component={CarePackages} />

            <Route exact path="/services" component={ServicesPage} />
            <Route exact path="/terms-of-use" component={TermsOfUsePage} />
            <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
            <Route exact path="/hipaa-authorization" component={HipaaAuthorizationPage} />
            <Route exact path="/cookie-policy" component={CookiePolicyPage} />
            <Route exact path="/delivery-policy" component={DeliveryPolicyPage} />
            <Route exact path="/refund-policy" component={RefundPolicyPage} />
            <Route exact path="/acceptable-policy" component={AcceptablePolicy} />
            <Route exact path="/additional-terms" component={AdditionalTerms} />
            <Route exact path="/partner" component={PartnerPage} />
            <Route exact path="/contact-us" component={ContactUsPage} />
            <Route exact path="/404" component={NotFound} />

            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        </div>
        <Footer />
        <SaveDoctorModal />
        <LoginModal />
        <SignupModal />
        <PartnerFormModal />
        <ScrollToTop />
      </div>
    );
  }
}

const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withSaga,
  withRouter,
  withAuthentication,
)(App);
