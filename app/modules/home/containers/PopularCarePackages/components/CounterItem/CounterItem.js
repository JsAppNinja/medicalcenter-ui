import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';

class CounterItem extends Component {
  render() {
    const {
      blockNumber,
      imgClassname,
      number,
      text,
    } = this.props;

    return (
      <Col xs={6} md={3} className={blockNumber}>
        <div className="holder">
          <span className={imgClassname} />
          <span className="info">
            <span className="counter">
              {number}
            </span>
          </span>
          <span className="txt">
            {text}
          </span>
        </div>
      </Col>
    );
  }
}

CounterItem.propTypes = {
  blockNumber: PropTypes.string,
  imgClassname: PropTypes.string,
  number: PropTypes.string,
  text: PropTypes.string,
};

CounterItem.defaultProps = {
  blockNumber: '',
  imgClassname: '',
  number: '',
  text: '',
};

export default CounterItem;
