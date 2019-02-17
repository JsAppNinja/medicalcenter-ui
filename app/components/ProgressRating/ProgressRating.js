import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressRating extends Component {
  render() {
    const {
      title,
      now,
    } = this.props;

    const customStyle = {
      width: `${Math.min(100, now)}%`,
    };

    return (
      <React.Fragment>
        <strong className="title">
          {title}
        </strong>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={customStyle}
          >
            <span className="value">{now}%</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProgressRating.propTypes = {
  title: PropTypes.string,
  now: PropTypes.number,
};

ProgressRating.defaultProps = {
  title: '',
  now: 50,
};

export default ProgressRating;
