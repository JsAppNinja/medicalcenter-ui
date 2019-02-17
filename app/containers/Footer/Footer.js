import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { auth } from 'utils/firebase';
import LogoImg from 'images/logo.svg';
import Container from 'components/Container';
import Divider from 'components/Divider';
import { showLoginModal } from 'containers/LoginModal/redux/actions';
import { showSignupModal } from 'containers/SignupModal/redux/actions';
import { makeSelectAuthUser } from 'modules/auth/redux/selectors';

import './style.scss';

class Footer extends Component {
  signOut = () => {
    auth.doSignOut();
  }

  render() {
    const { authUser } = this.props;

    return (
      <div className="page-footer">
        <Container>
          <div className="page-footer__title"><Link to="/contact-us" className="page-footer__title-content">Share KangarooMD Feedback</Link></div>
          <Divider />
          <div className="page-footer__body">
            <div className="page-footer__body-section">
              <div className="page-footer__body-section__header">
                <div className="page-footer__body-section__logo" style={{ backgroundImage: `url(${LogoImg})` }} />
              </div>
              <a className="page-footer__body-section__title" href="tel:408-641-5446">
                <i className="fa fa-phone page-footer__body-section__icon" />
                <span>408-641-5446</span>
              </a>
              <div className="page-footer__body-section__title">
                <i className="fa fa-map-marker page-footer__body-section__icon" />
                <span>P.O. Box #641951, San Jose, 95164</span>
              </div>
              <a className="page-footer__body-section__title" href="mailto:support@kangaroohealth.com">
                <i className="fa fa-envelope page-footer__body-section__icon" />
                <span>support@kangaroohealth.com</span>
              </a>
            </div>
            <div className="page-footer__body-section">
              <div className="page-footer__body-section__header">Company</div>
              <Link to="/services" className="page-footer__body-section__title">About</Link>
              <Link to="/contact-us" className="page-footer__body-section__title">Contact</Link>
            </div>
            <div className="page-footer__body-section">
              <div className="page-footer__body-section__header">What We Offer</div>
              <Link to="/doctors" className="page-footer__body-section__title">Find A Doctor</Link>
              <Link to="/packages" className="page-footer__body-section__title">Treatments</Link>
              <Link to="/services" className="page-footer__body-section__title">Service</Link>
            </div>
            <div className="page-footer__body-section">
              <div className="page-footer__body-section__header">For Providers</div>
              <Link to="/partner" className="page-footer__body-section__title">KangarooMD Partners</Link>
              <Link to="/doctors" className="page-footer__body-section__title">Claim Your Profile</Link>
            </div>
            <div className="page-footer__body-section">
              <div className="page-footer__body-section__header">My Account</div>
              {authUser ?
                <React.Fragment>
                  <Link className="page-footer__body-section__title" to={`/doctor/${authUser.get('profileId')}`}>Go to Profile</Link>
                  <Link className="page-footer__body-section__title" to={`/onboarding/${authUser.get('profileId')}`}>Edit Profile</Link>
                  <a className="page-footer__body-section__title" onClick={this.signOut}>Log Out</a>
                </React.Fragment> :
                <React.Fragment>
                  {/* <a onClick={this.props.showSignup} className="page-footer__body-section__title">Join Now</a> */}
                  <a onClick={this.props.showLogin} className="page-footer__body-section__title">Sign In</a>
                </React.Fragment>}
              <Link to="/contact-us" className="page-footer__body-section__title">Help</Link>
            </div>
          </div>

          <Divider />

          <div className="page-footer-social">
            <a href="https://twitter.com/Kangaroo_Health" className="page-footer-social__icon">
              <i className="social_twitter" />
            </a>
            <a href="https://www.facebook.com/gokangaroohealth/" className="page-footer-social__icon">
              <i className="social_facebook" />
            </a>
            <a href="https://www.youtube.com/channel/UCdf0MzPrJHS-9u2k_0exX-w?view_as=subscriber" className="page-footer-social__icon">
              <i className="social_youtube" />
            </a>
            <a href="https://www.linkedin.com/company/kangaroohealth-inc./" className="page-footer-social__icon">
              <i className="social_linkedin" />
            </a>
          </div>
          <div className="page-footer__copyright">&copy; 2018 KangarooHealth Inc. All rights reserved</div>
          <div className="page-footer__polices">
            <Link to="/terms-of-use" className="page-footer__policy">Terms Of Use</Link>
            <Link to="/privacy-policy" className="page-footer__policy">Privacy Policy</Link>
            <Link to="/cookie-policy" className="page-footer__policy">Cookie Policy</Link>
            <Link to="/hipaa-authorization" className="page-footer__policy">HIPPA Policy</Link>
            <Link to="/delivery-policy" className="page-footer__policy">Delivery Policy</Link>
            <Link to="/refund-policy" className="page-footer__policy">Refund Policy</Link>
            <Link to="/acceptable-policy" className="page-footer__policy">Acceptable Use Policy</Link>
            <Link to="/additional-terms" className="page-footer__policy">Additional Terms</Link>
          </div>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  authUser: makeSelectAuthUser(),
});

const mapDispatchToProps = {
  showLogin: showLoginModal,
  showSignup: showSignupModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Footer);
