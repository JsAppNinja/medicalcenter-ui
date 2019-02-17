import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { auth } from 'utils/firebase';
import LogoImg from 'images/logo.svg';
import MobileLogoImg from 'images/mobile-logo.svg';
// import Button from 'react-bootstrap/lib/Button';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Avatar from 'components/Avatar';
import AutocompleteSearchAll from 'containers/AutocompleteSearchAll';
import history from 'browserHistory';
import { showLoginModal } from 'containers/LoginModal/redux/actions';
import { showSignupModal } from 'containers/SignupModal/redux/actions';
import { showSaveDoctorModal } from 'containers/SaveDoctorModal/redux/actions';
import { packagesFilterRequest } from 'modules/carepackages/redux/actions';
import { makeSelectAuthUser } from 'modules/auth/redux/selectors';
import { togglePartnerModal } from 'containers/PartnerFormModal/redux/actions';
import CustomToggle from './CustomToggle';
import './style.scss';

class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      isSearchOpen: false,
      isOpen: false,
    };
  }

  handleSearchOpen = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  }

  handleMenuOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  signOut = () => {
    auth.doSignOut();
  }

  goToProfile = () => {
    const { authUser } = this.props;
    const profileId = authUser && authUser.get('profileId');

    if (profileId) {
      history.push(`/doctor/${profileId}`);
    }
  }

  editProfile = () => {
    const { authUser } = this.props;
    const profileId = authUser && authUser.get('profileId');

    if (profileId) {
      history.push(`/onboarding/${profileId}`);
    }
  }

  handleShowPartnerModal = () => {
    this.props.togglePartnerModal(true);
  }

  renderLoggedIn() {
    const { authUser } = this.props;

    return (
      <React.Fragment>
        <a className="nav__top-bell" />
        <Dropdown id="profile-menu" pullRight>
          <CustomToggle bsRole="toggle">
            <Avatar size="xs" name={`${authUser.get('firstName')} ${authUser.get('lastName')}`} />
          </CustomToggle>
          <Dropdown.Menu className="profile-menu">
            <MenuItem eventKey="1" onClick={this.goToProfile}>Go to Profile</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2" onClick={this.editProfile}>Edit Profile</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3" onClick={this.signOut}>Sign Out</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }

  renderLoggedOut() {
    return (
      <React.Fragment>
        {/* <Button bsStyle="primary" className="nav__top-button" onClick={this.props.showSignup}>
          Join
        </Button> */}
        <a className="nav__top-link" onClick={this.props.showLogin}>Sign In</a>
      </React.Fragment>
    );
  }

  render() {
    const { authUser } = this.props;
    const { isSearchOpen, isOpen } = this.state;

    return (
      <nav className="nav">
        <div className="nav-desktop">
          <div className="nav__top">
            <div className="nav__top-left">
              <Link to="/" className="brand">
                <img className="navbar-logo" src={LogoImg} alt="logo" />
              </Link>
              <AutocompleteSearchAll />
            </div>
            <div className="nav__top-right">
              <a className="nav__top-saved" onClick={this.props.showSavedDoctors}>SAVED</a>
              {authUser ?
                this.renderLoggedIn() :
                this.renderLoggedOut()}
              <Button bsStyle="primary" className="nav__top-partner" onClick={this.handleShowPartnerModal}>
              Partner with Us
              </Button>
            </div>
          </div>
          <div className="nav__bottom">
            <Link to="/doctors" className="nav__bottom-link">Find A Doctor</Link>
            <Link to="/packages" className="nav__bottom-link">Treatments</Link>
            <Link to="/services" className="nav__bottom-link">Patient Resources</Link>
            <Link to="/partner" className="nav__bottom-link">For Providers</Link>
          </div>
        </div>

        <div className="nav-mobile">
          <div className={`nav__top ${!isSearchOpen ? 'nav-opened' : 'nav-closed'}`}>
            <div className="nav__top-left">
              <Link to="/" className="brand">
                <img className="navbar-logo" src={MobileLogoImg} alt="logo" />
              </Link>
            </div>
            <div className="nav__top-right">
              {authUser ?
                this.renderLoggedIn() :
                this.renderLoggedOut()}
              <i className="icon_search nav__top-icon" onClick={this.handleSearchOpen} />
              <div className={`nav__top-menuicon ${isOpen ? 'nav__top-menuopend' : undefined}`} onClick={this.handleMenuOpen}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </div>
          </div>
          <div className={`nav__top-search ${isSearchOpen ? 'search-opened' : 'search-closed'}`}>
            <AutocompleteSearchAll className="nav__top-searchbar" />
            <i className="fa fa-close nav__top-search__closeicon" onClick={this.handleSearchOpen} />
          </div>
          <div className={`nav__bottom ${isOpen ? 'opened' : 'closed'}`}>
            <Link to="/doctors" className="nav__bottom-link">Find A Doctor</Link>
            <Link to="/packages" className="nav__bottom-link">Treatments</Link>
            <Link to="/services" className="nav__bottom-link">Patient Resources</Link>
            <Link to="/partner" className="nav__bottom-link">For Providers</Link>
            <a className="nav__bottom-link" onClick={this.props.showSavedDoctors}>SAVED</a>
            <Button bsStyle="primary" className="nav__top-partner" onClick={this.handleShowPartnerModal}>
              Partner with Us
            </Button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authUser: makeSelectAuthUser(),
});

const mapDispatchToProps = {
  showLogin: showLoginModal,
  showSignup: showSignupModal,
  showSavedDoctors: showSaveDoctorModal,
  searchPackages: packagesFilterRequest,
  togglePartnerModal,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(NavigationBar);
