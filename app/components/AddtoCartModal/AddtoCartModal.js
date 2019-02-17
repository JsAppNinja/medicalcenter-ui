import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import AvatarImg from 'images/avatar.png';
import './AddtoCartModal.scss';

const DoctorInfo = styled.div`
  margin-bottom: 20px;
`;

const DoctorPhoto = styled.div`
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
`;

const DoctorDetail = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const Img = styled.img`
  width: 90px;
  height: 120px;
`;

const AddCartPrice = styled.span`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 14px;
`;

const VideoConsultation = styled.span`
  font-weight: 600;
`;

const AddtocartDescription = styled.div`
  font-weight: 600;
  font-size: 16px;
  padding: 8px 0;
`;

const ConsultationInfo = styled.div`
  margin-bottom: 50px;
`;

class AddtoCartModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstDate: undefined,
      secondDate: undefined,
      thirdDate: undefined,
      fourthDate: undefined,
    };
  }

  handleChangeDate = (field) => (date) => {
    this.setState({ [field]: date });
  };

  addToCart = () => {
    // Add to Cart
  };

  consultation() {
    return (
      <form className="trip-form trip-form-v2">
        <fieldset>
          <input id="cartprice" type="hidden" value="350.00" />
          <input
            id="cartdescription"
            type="hidden"
            value="Orthopedic Consultation"
          />
          <Col sm={12} md={6}>
            <FormGroup>
              <ControlLabel>1st date</ControlLabel>
              <div className="select-holder">
                <DayPickerInput
                  placeholder="YYYY-MM-DD"
                  format="D/M/YYYY"
                  value={this.state.firstDate}
                  onDayChange={this.handleChangeDate('firstDate')}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
            <FormGroup>
              <ControlLabel>2nd date</ControlLabel>
              <div className="select-holder">
                <DayPickerInput
                  placeholder="YYYY-MM-DD"
                  format="D/M/YYYY"
                  value={this.state.secondDate}
                  onDayChange={this.handleChangeDate('secondDate')}
                />
              </div>
            </FormGroup>
          </Col>
          <div className="spacer-10" />
          <Col sm={12} md={6}>
            <FormGroup>
              <ControlLabel>3rd date</ControlLabel>
              <div className="select-holder">
                <DayPickerInput
                  placeholder="YYYY-MM-DD"
                  format="D/M/YYYY"
                  value={this.state.thirdDate}
                  onDayChange={this.handleChangeDate('thirdDate')}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
            <FormGroup>
              <ControlLabel>4th date</ControlLabel>
              <div className="select-holder">
                <DayPickerInput
                  placeholder="YYYY-MM-DD"
                  format="D/M/YYYY"
                  value={this.state.fourthDate}
                  onDayChange={this.handleChangeDate('fourthDate')}
                />
              </div>
            </FormGroup>
            <div className="spacer-10" />
          </Col>
        </fieldset>
      </form>
    );
  }

  render() {
    return (
      <Modal
        className="modal-cart"
        show
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <div className="avatar">
            <img src={AvatarImg} alt="avatar" />
          </div>
          <Modal.Title>Consultation with ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorInfo>
            <DoctorPhoto>
              <Img
                src="https://photos.healthgrades.com/img/prov/Y/W/T/YWT85_w90h120_v33448.jpg"
                alt="abcd"
              />
            </DoctorPhoto>
            <DoctorDetail>
              <AddCartPrice className="clearfix">$350.00</AddCartPrice>
                Would you like to add a &nbsp;
              <VideoConsultation>Video Consultation</VideoConsultation>
                &nbsp;for
              <AddtocartDescription className="clearfix">
                  Orthopedic Consultation
              </AddtocartDescription>
                with &nbsp;
              <VideoConsultation>Dr. Robert Rovner, MD</VideoConsultation>
                &nbsp;to your cart?
            </DoctorDetail>
          </DoctorInfo>

          <ConsultationInfo>
            <h5>
                Choose up to 4 dates you are available for a video consultation.
                Physician will respond with suggested consultation times.
            </h5>
            {
              this.consultation()
            }
          </ConsultationInfo>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-md" id="doNotAdd" onClick={this.handleClose}>
              Not Yet
          </Button>
          <Button className="btn-md" id="doNotAdd" onClick={this.addToCart}>
              Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddtoCartModal.propTypes = {
  handleClose: PropTypes.func,
};

AddtoCartModal.defaultProps = {
  handleClose: () => {},
};

export default AddtoCartModal;
