import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';

import './style.scss';

class BacktoTop extends Component {
  render() {
    const { scrollCN } = this.props;
    return (
      <ScrollToTop
        className={scrollCN}
        showUnder={160}
        duration={1000}
      >
        <div className="scroll-top">
          <i className="fa fa-long-arrow-up scroll-top__icon" />
        </div>
      </ScrollToTop>
    );
  }
}

BacktoTop.propTypes = {
  scrollCN: PropTypes.string,
};

export default BacktoTop;
