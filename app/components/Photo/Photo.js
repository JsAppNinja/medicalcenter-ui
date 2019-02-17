import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AnonymousPhoto from '../AnonymousPhoto';
import './style.scss';

const Photo = ({
  className,
  src,
}) => {
  const style = {
    backgroundImage: `url('${src}'), url('${AnonymousPhoto}')`,
  };

  return (
    <div
      className={cx('photo', className)}
      style={style}
    />
  );
};

Photo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

export default Photo;
