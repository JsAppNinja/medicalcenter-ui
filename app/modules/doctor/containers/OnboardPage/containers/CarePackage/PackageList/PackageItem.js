import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PaddedDivider from 'components/PaddedDivider';
import { getPrice } from 'utils/currency';

class PackageItem extends Component {
  render() {
    const { bundle, editPackage, removePackage } = this.props;

    return (
      <div className="existing-package__item">
        <Row className="existing-package__item-titlebar">
          <Col sm={8}>
            <div className="existing-package__item-title">{bundle.get('title')}</div>
          </Col>
          <Col sm={4} className="existing-package__item-icons">
            <i className="fa fa-pencil edit-icons" onClick={editPackage} />
            <i className="fa fa-trash edit-icons" onClick={removePackage} />
          </Col>
        </Row>
        <PaddedDivider />
        <Row>
          <Col sm={2}>
            <div className="existing-package__item-label">Price</div>
            <div className="existing-package__item-text">${getPrice(bundle.get('min_price'))} - ${getPrice(bundle.get('max_price'))}</div>
          </Col>
          <Col sm={10}>
            <label className="existing-package__item-label">Description</label>
            <div className="existing-package__item-text">{bundle.get('description')}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PackageItem;
