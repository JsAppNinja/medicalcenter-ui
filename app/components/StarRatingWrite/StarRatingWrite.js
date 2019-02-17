import React, { Component } from 'react';
import Rater from 'react-rater';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';

import './StarRatingWrite.scss';

class StarRatingWrite extends Component {
  render() {
    const {
      label,
    } = this.props;

    return (
      <React.Fragment>
        <div>{label}</div>
        <Rater total={10} rating={0} />
      </React.Fragment>
    );
  }
}

StarRatingWrite.propTypes = {
  label: PropTypes.string,
};

StarRatingWrite.defaultProps = {
  label: '',
};

export default StarRatingWrite;
