import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PartnerSectionData from './PartnerSectionData';

import './style.scss';

const ImageItem = styled.img`
  width: 150px;
`;

class PartnerSection extends Component {
  render() {
    return (
      <Row className="logos">
        {PartnerSectionData.map((partner, index) => (
          <Col md={2} sm={4} xs={6} key={`item_${index}`} className="logo">
            <Link to={partner.plink}>
              <ImageItem src={partner.img} alt="Stone Clinic" />
            </Link>
          </Col>
        ))}
      </Row>
    );
  }
}

export default PartnerSection;
