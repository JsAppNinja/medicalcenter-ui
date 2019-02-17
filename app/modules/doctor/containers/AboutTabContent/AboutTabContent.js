import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataList from 'components/DataList';
import GetDirections from 'components/GetDirections';
import ExternalLink from 'components/ExternalLink';

import SectionHeader from '../../components/SectionHeader';
import { makeSelectDoctorProfile } from '../../redux/selectors';
import './style.scss';

class AboutTabContent extends Component {
  renderEducation(item) {
    return (
      <React.Fragment>
        <span>{item.get('school')}</span>
        <br />
        <small>{item.get('major')} ({item.get('startYear')}-{item.get('endYear')})</small>
      </React.Fragment>
    );
  }

  renderAward(item) {
    if (typeof item === 'string') {
      return item;
    }

    return (
      <React.Fragment>
        <span>{item.get('title')}</span>
        <br />
        <small>{item.get('description')} - {item.get('year')}</small>
      </React.Fragment>
    );
  }

  renderLink(item) {
    if (typeof item === 'string') {
      return item;
    }

    return (
      <React.Fragment>
        <ExternalLink href={item.get('link')}>
          {item.get('title')}
        </ExternalLink>
        <br />
        <small>{item.get('description')}</small>
      </React.Fragment>
    );
  }

  renderText(item) {
    if (typeof item === 'string') {
      return item;
    }

    return (
      <React.Fragment>
        <span>{item.get('title')}</span>
        <br />
        <small>{item.get('description')}</small>
      </React.Fragment>
    );
  }

  renderArray(value, renderer = (v) => v) {
    if (!value) {
      return null;
    }

    return (
      <ul>
        {value.map((item, index) => (
          <li key={`item_${index}`}>
            {renderer(item)}
          </li>))}
      </ul>
    );
  }

  render() {
    const { doctor, advanced } = this.props;

    return (
      <div className="profile-tabs__about">
        <SectionHeader>Contact Info</SectionHeader>
        <DataList>
          <DataList.Item title="Address" className="profile-tabs__about-addr">
            <div className="profile-tabs__about-addr__text">
              {doctor.get('street')}<br />
              {doctor.get('city')} {doctor.get('state')}<br />
              {doctor.get('zip')} {doctor.get('country')}<br />
            </div>
            <div className="profile-tabs__about-addr__directions">
              <GetDirections
                street={doctor.get('street')}
                state={doctor.get('state')}
                city={doctor.get('city')}
                zip={doctor.get('zip')}
              />
            </div>
          </DataList.Item>
          {advanced &&
            <DataList.Item title="Website">
              <ExternalLink href={doctor.get('website')}>
                {doctor.get('website')}
              </ExternalLink>
            </DataList.Item>}
          <DataList.Item title="Phone">
            {doctor.get('phone')}
          </DataList.Item>
        </DataList>

        <div className="spacer-40px" />

        <SectionHeader>Background</SectionHeader>
        <DataList>
          {!!doctor.get('education').size &&
            <DataList.Item title="Education">
              {this.renderArray(doctor.get('education'), this.renderEducation)}
            </DataList.Item>}
          {!!doctor.get('hospital_affiliates').size &&
            <DataList.Item title="Hospital Affiliations">
              {this.renderArray(doctor.get('hospital_affiliates'))}
            </DataList.Item>}
          {!!doctor.get('languages').size &&
            <DataList.Item title="Languages Spoken">
              {this.renderArray(doctor.get('languages'))}
            </DataList.Item>}
          {!!doctor.get('board_certifications').size &&
            <DataList.Item title="Board Certifications">
              {this.renderArray(doctor.get('board_certifications'), this.renderText)}
            </DataList.Item>}
          {!!doctor.get('memberships').size &&
            <DataList.Item title="Professional Memberships">
              {this.renderArray(doctor.get('memberships'), this.renderLink)}
            </DataList.Item>}
          {!!(doctor.get('media_publications').size + doctor.get('awards').size) &&
            <DataList.Item title="Awards & Publications">
              {this.renderArray(doctor.get('awards'), this.renderAward)}
              {this.renderArray(doctor.get('media_publications'), this.renderLink)}
            </DataList.Item>}
        </DataList>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(AboutTabContent);
