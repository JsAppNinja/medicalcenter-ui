import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Avatar from 'components/Avatar';
import StarRating from 'components/StarRating';
import SvgIcon from 'components/SvgIcon';
import ProfileOverviewItem from '../ProfileOverviewItem';

import './style.scss';

class ProfileOverviewComponent extends Component {
  renderMain() {
    const {
      profile,
      claimed,
      gotoReviews,
      gotoCareService,
      handleShowSocialModal,
      handleShowSaveDoctorModal,
      pageLink,
      profileButtonTitle,
    } = this.props;

    return (
      <div className="profile-overview__main">
        <div className="profile-overview__main-left">
          {gotoReviews ?
            <a href="#tabs" className="profile-overview__main-rating" onClick={gotoReviews}>
              <StarRating total={5} rating={profile.get('rating')} />
              <u>{profile.get('rating')} stars ({profile.get('review_list').size} reviews)</u>
            </a> :
            <div className="profile-overview__main-rating">
              <StarRating total={5} rating={profile.get('rating')} />
              <span>{profile.get('rating')} stars ({profile.get('review_list').size} reviews)</span>
            </div>
          }
          <div className="profile-overview__name">{profile.get('name')}</div>
          <div className="profile-overview__specialities">{profile.get('title')}</div>
          <ProfileOverviewItem icon="star-circle" isSvg>
            {profile.get('experience') || '10'} Years Experience
          </ProfileOverviewItem>
          <ProfileOverviewItem icon="tag_alt">
            {gotoCareService ?
              <a href="#tabs" onClick={gotoCareService}>
                <u>from <strong>${profile.get('lowest_consultation_price')}</strong></u>
              </a> :
              <span>from <strong>${profile.get('lowest_consultation_price')}</strong></span>
            }
          </ProfileOverviewItem>
          <ProfileOverviewItem icon="pin_alt">
            {profile.get('city')}, {profile.get('state')}, {profile.get('country') || 'USA'}
          </ProfileOverviewItem>
        </div>

        <div className="profile-overview__main-right">
          <div className="profile-overview__main-actions">
            {(claimed || profile.get('paid')) &&
              <Button className="icon shadow" onClick={handleShowSocialModal}>
                <i className="icon_upload" /> Share
              </Button>}
            <Button className="icon shadow" onClick={handleShowSaveDoctorModal}>
              <i className="icon_heart_alt" /> Save
            </Button>
          </div>
          <Link className="btn btn-primary btn-lg" to={pageLink}>
            {profileButtonTitle}
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      profile,
      advanced,
      claimed,
      authUser,
    } = this.props;

    return (
      <div className="profile-overview__content">
        <div className="profile-overview__content-left">
          <Avatar
            src={`${profile.get('photo_url')}?w=170`}
            name={profile.get('name')}
            paid={profile.get('paid')}
          />
          {!advanced &&
            (
              claimed ?
                <span className="btn icon shadow btn-claim">
                  <SvgIcon icon="claimed" /> Claimed
                </span> :
                (!authUser &&
                  <Link className="btn icon shadow btn-claim" to={`/doctor/${profile.get('uuid')}/claim`}>
                    <i className="icon_hourglass" /> Claim
                  </Link>)
            )
          }
        </div>
        {this.renderMain()}
      </div>
    );
  }
}

ProfileOverviewComponent.propTypes = {
  profile: PropTypes.object,
  advanced: PropTypes.bool,
  gotoReviews: PropTypes.func,
  gotoCareService: PropTypes.func,
  claimed: PropTypes.bool,
  // authUser:
  handleShowSocialModal: PropTypes.func.isRequired,
  handleShowSaveDoctorModal: PropTypes.func.isRequired,
  pageLink: PropTypes.string.isRequired,
  profileButtonTitle: PropTypes.string.isRequired,
};


export default ProfileOverviewComponent;
