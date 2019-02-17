import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const BlogItem = ({
  children,
  url,
  imgSrc,
  title,
  date,
  author,
}) => (
  <div className="blog-item">
    <div className="blog-item__title">
      {title}
    </div>
    <div className="blog-item__content">
      <div className="blog-item__content-left">
        <div className="blog-item__content-left__img" style={{ backgroundImage: `url('${imgSrc}')` }} />
      </div>
      <div className="blog-item__content-right">
        {children}
        <div className="blog-item__content-right__buttons">
          <a href={url} target="_blank" className="blog-item__link btn btn-primary">
            Read More <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
    <div className="blog-item__footer">
      <i className="fa fa-user" />
      Posted By {author} on {date}
    </div>
  </div>
);

BlogItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  imgSrc: PropTypes.string,
  children: PropTypes.node,
};

export default BlogItem;
