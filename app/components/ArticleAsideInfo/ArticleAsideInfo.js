import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import SvgIcon from 'components/SvgIcon';

import './style.scss';

const ArticleAsideInfo = ({
  customclassname,
  price,
  minPrice,
  maxPrice,
  svgname,
  title,
  explorelink,
}) => (
  <aside className={cx('info-aside', customclassname)}>
    <span className="price">
      {price && <span>from<br />{price}</span> }
      {!price && <span>{minPrice} <br /> ~ <br />  {maxPrice}</span>}
    </span>
    <div className="activity-level">
      <SvgIcon
        className="icon-mask size-67 fill-french-blue"
        icon={svgname}
      />
      <span className="text">
        {title}
      </span>
    </div>
    <Link
      to={explorelink}
      className="btn btn-primary btn-primary__width"
    >
      Explore
    </Link>
  </aside>
);

ArticleAsideInfo.propTypes = {
  customclassname: PropTypes.string,
  price: PropTypes.string,
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  svgname: PropTypes.string,
  title: PropTypes.string,
  explorelink: PropTypes.string,
};

export default ArticleAsideInfo;
