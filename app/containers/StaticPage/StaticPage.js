import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import history from 'browserHistory';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Container from 'components/Container';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { makeSelectOptionLabel } from './redux/selectors';
import { setSelectOptionLabel } from './redux/actions';
import './style.scss';

const LINKS = [
  {
    to: '/terms-of-use',
    label: 'Terms Of Use',
  },
  {
    to: '/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    to: '/hipaa-authorization',
    label: 'HIPAA Authorization',
  },
  {
    to: '/cookie-policy',
    label: 'Cookie Policy',
  },
  {
    to: '/delivery-policy',
    label: 'Delivery Policy',
  },
  {
    to: '/refund-policy',
    label: 'Refund Policy',
  },
  {
    to: '/acceptable-policy',
    label: 'Acceptable Use Policy',
  },
  {
    to: '/additional-terms',
    label: 'Additional Terms',
  },
];

const options = [];
LINKS.forEach((link) => {
  options.push({
    label: link.label,
    value: link.to,
  });
});

class StaticPagenav extends Component {
  constructor(props) {
    super(props);

    LINKS.forEach((link) => {
      if (link.to === window.location.pathname) {
        props.setLabel(link.label);
      }
    });
  }

  handleSelect = (selectedOption) => {
    this.props.setLabel(selectedOption.label);
    history.push(selectedOption.value);
  }

  render() {
    const { label } = this.props;

    return (
      <div className="static-page">
        <div className="static-page-nav">
          <div className="static-page-nav__desktop">
            {LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="static-page-nav__link"
                activeClassName="static-page-nav__link--active"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="static-page-nav__mobile">
            <Dropdown
              options={options}
              onChange={this.handleSelect}
              value={label}
              className="static-page-nav__dropdown"
            />
          </div>
        </div>
        <Container className="static-page-content">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  label: makeSelectOptionLabel(),
});

const mapDispatchToProps = {
  setLabel: setSelectOptionLabel,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(StaticPagenav);
