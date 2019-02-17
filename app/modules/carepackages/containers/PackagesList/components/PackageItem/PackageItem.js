import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'components/StarRating';
import ArticleIcons from 'components/ArticleIcons';
import ArticleAsideInfo from 'components/ArticleAsideInfo';
import { getCurrency } from 'utils/currency';

import TempImage from 'images/package_doctor-consultation.jpg';

import './style.scss';
import TEXTS from './texts';

class PackageItem extends Component {
  render() {
    const { carepackage } = this.props;
    const packageDoctorsLink = `/doctors/?filters[package]=${carepackage.get('canonicalName')}`;
    return (
      <article className="article has-hover-s1 article-list packages-list">
        <div className="thumbnail packages-list__thumbnail">
          <div className="img-wrap">
            <Link to={packageDoctorsLink}>
              <img
                src={carepackage.get('image') || TempImage}
                height="240"
                width="350"
                alt={carepackage.get('title')}
              />
            </Link>
          </div>
          <div className="description packages-list__thumbnail-description">
            <div className="col-left">
              <header className="heading packages-list__heading">
                <h3 className="packages-list__heading-title">
                  <Link to={packageDoctorsLink}>
                    {carepackage.get('title')}
                  </Link>
                </h3>
                <div className="info-day packages-list__heading-numbers">
                  {carepackage.get('providers')} Provider(s)
                </div>
              </header>
              <p>
                {carepackage.get('description')}
              </p>
              <div className="reviews-holder">
                <StarRating total={5} rating={carepackage.get('rating') || '5'} />
                <div className="info-rate">Based on {carepackage.get('reviews') || '10'} Reviews</div>
              </div>
              <ArticleIcons
                svgnames={TEXTS}
                sharelink="share/"
                favorlink="favor/"
              />
            </div>
            <ArticleAsideInfo
              minPrice={getCurrency(carepackage.get('minPrice'))}
              maxPrice={getCurrency(carepackage.get('maxPrice'))}
              svgname="online-consultation"
              title={carepackage.get('consultDescription')}
              explorelink={packageDoctorsLink}
            />
          </div>
        </div>
      </article>
    );
  }
}

PackageItem.propTypes = {
  carepackage: PropTypes.object,
};

export default PackageItem;
