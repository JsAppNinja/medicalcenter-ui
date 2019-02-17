import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';
import { getCurrency } from 'utils/currency';

import './style.scss';

class CareServiceItem extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  onToggle = (e) => {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { bundle, doctorID } = this.props;
    const { expanded } = this.state;
    const expandCN = cx('fa', {
      'fa-caret-up': expanded,
      'fa-caret-down': !expanded,
    });

    return (
      <div className="care-service-item">
        <div className="care-service-item__header">
          <div className="care-service-item__header-price">
            {getCurrency(bundle.min_price) !== getCurrency(bundle.max_price) ?
              `${getCurrency(bundle.min_price)} - ${getCurrency(bundle.max_price)}` :
              getCurrency(bundle.consult_price)}
          </div>
        </div>
        <div className="care-service-item__body">
          <div className="care-service-item__body-left">
            <div className="care-service-item__body-title">
              {bundle.title}
            </div>
            <div className="care-service-item__body-content">
              {bundle.financing_info}
            </div>
          </div>
          <Link className="btn btn-primary" to={`/doctor/${doctorID}/checkout/${bundle.uuid}`}>
            BOOK NOW
          </Link>
        </div>
        <div className="care-service-item__footer">
          <span onClick={this.onToggle} className="care-service-item__footer-expander">
            Show {expanded ? 'Less' : 'More'} <i className={expandCN} />
          </span>
          <Collapse isOpened={expanded}>
            <div className="care-service-item__footer-text">
              {bundle.description}
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

CareServiceItem.propTypes = {
  bundle: PropTypes.shape({
    price: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    uuid: PropTypes.string,
    object: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  doctorID: PropTypes.string,
};

export default CareServiceItem;
