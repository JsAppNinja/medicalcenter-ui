import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'components/StarRating';
import ArticleIcons from 'components/ArticleIcons';
import ArticleAsideInfo from 'components/ArticleAsideInfo';

import TEXTS from './texts';

import './style.scss';

class DoctorFeedItem extends Component {
  render() {
    const { doctor } = this.props;
    return (
      <article className="article has-hover-s1 article-list">
        <div className="thumbnail thumbnail__height">
          <div className="img-wrap img-wrap__width">
            <Link to={`/doctor/${doctor.get('uuid')}`}>
              <img
                className="doctor-feed__image"
                src={doctor.get('photo_url')}
                alt={doctor.get('name')}
              />
            </Link>
          </div>
          <div className="description description__width">
            <div className="col-left description-body">
              <div>
                <header className="heading">
                  <h3 className="heading-name">
                    <Link to={`/doctor/${doctor.get('uuid')}`}>
                      {doctor.get('name')}
                    </Link>
                  </h3>
                  <div className="info-day heading-address">
                    {doctor.get('city')}, {doctor.get('state')}
                  </div>
                </header>
                <span className="info">
                  { doctor.get('title') || 'Orthopedic Surgeon' } @ {doctor.get('practice_name')}
                </span>
                <p>
                  {doctor.get('about')}
                </p>
              </div>
              <div>
                <div className="reviews-holder">
                  <StarRating total={5} rating={doctor.get('rating')} />
                  <div className="info-rate">Based on {doctor.get('reviews')} Reviews</div>
                </div>
                <ArticleIcons
                  svgnames={TEXTS}
                  sharelink="share/"
                  favorlink="favor/"
                />
              </div>
            </div>
            <ArticleAsideInfo
              customclassname="article-asdie-info__padding"
              price={`$${doctor.get('lowest_consultation_price')}`}
              svgname="online-consultation"
              title="Orthopedic Consultation"
              explorelink={`/doctor/${doctor.get('uuid')}`}
            />
          </div>
        </div>
      </article>
    );
  }
}

DoctorFeedItem.propTypes = {
  doctor: PropTypes.object,
};

export default DoctorFeedItem;
