import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';
import StarRatingReview from 'components/StarRatingReview';

const ArticleBlock = styled.article`
  padding-left: 10px;
  padding-right: 10px;
`;

class PackageItem extends Component {
  render() {
    const { carepackage } = this.props;

    return (
      <Col sm={6} md={4}>
        <ArticleBlock className="article has-hover-s3">
          <div className="thumbnail">
            <div className="img-wrap">
              <Link to="/packages">
                <img src={carepackage.userimage} height="215" width="370" alt={carepackage.title} />
              </Link>
              <div className="img-caption text-uppercase">
                {carepackage.caption}
              </div>
              <div className="hover-article">
                <div className="star-rating">
                  <StarRatingReview rating={carepackage.rating} />
                </div>
                <div className="info-footer">
                  <span className="price">
                    from
                    <span>{carepackage.price}</span>
                  </span>
                  <Link to="/packages" className="link-more">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <h3>
              <Link to="/packages">{carepackage.title}</Link>
            </h3>
            <p>{carepackage.about}</p>
          </div>
        </ArticleBlock>
      </Col>
    );
  }
}

PackageItem.propTypes = {
  carepackage: PropTypes.object,
};

export default PackageItem;
