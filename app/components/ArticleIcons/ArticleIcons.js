import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SvgIcon from 'components/SvgIcon';

import './style.scss';

const ArticleIcons = ({
  svgnames,
  sharelink,
  favorlink,
}) => (
  <footer className="info-footer">
    <ul className="ico-list ico-listview">
      {svgnames.map((name, index) => (
        <li key={index} className="pop-opener">
          <SvgIcon
            className="icon-mask size-20 fill-french-blue"
            icon={name.icon}
          />
          <div className="popup">
            {name.title}
          </div>
        </li>
      ))}
    </ul>
    <ul className="ico-action">
      <li>
        <Link to={sharelink}>
          <i />
        </Link>
      </li>
      <li>
        <Link to={favorlink}>
          <i />
        </Link>
      </li>
    </ul>
  </footer>
);

ArticleIcons.propTypes = {
  svgnames: PropTypes.array,
  sharelink: PropTypes.string,
  favorlink: PropTypes.string,
};

export default ArticleIcons;
