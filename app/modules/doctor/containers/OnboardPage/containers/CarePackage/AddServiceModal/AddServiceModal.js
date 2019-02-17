import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form/immutable';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import {
  newServiceModalToggle,
  editServiceModalToggle,
} from '../../../redux/actions';
import {
  makeSelectNewServiceModalShow,
  makeSelectEditServiceModalShow,
} from '../../../redux/selectors';

class AddServiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      description: '',
    };
  }

  handleChangeState = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  };

  handleSave = () => {
    this.handleClose();
  }

  handleClose = () => {
    const {
      isEditServiceModal,
    } = this.props;

    if (isEditServiceModal) {
      this.props.editServiceModalToggle(false);
    } else {
      this.props.newServiceModalToggle(false);
    }
  }

  addNewServiceform() {
    const {
      isEditServiceModal,
      serviceTitle,
    } = this.props;
    const {
      title,
      price,
      description,
    } = this.state;

    return (
      <React.Fragment>
        {!isEditServiceModal ?
          <Row>
            <Col sm={12}>
              <FormGroup controlId="serviceTitle">
                <ControlLabel className="package-editmodal__title">Care Service Package Title</ControlLabel>
                <FormControl
                  type="text"
                  value={title}
                  placeholder="Service Title"
                  onChange={this.handleChangeState('title')}
                />
              </FormGroup>
            </Col>
          </Row> :
          <Row>
            <Col sm={12} className="package-editmodal__servicetitle">
              {serviceTitle}
            </Col>
          </Row>
        }
        <Row>
          <Col sm={2}>
            <FormGroup controlId="packageTotal">
              <ControlLabel>Price</ControlLabel>
              <FormControl
                type="text"
                value={price}
                placeholder="Price"
                onChange={this.handleChangeState('price')}
              />
            </FormGroup>
          </Col>
          <Col sm={10}>
            <FormGroup controlId="packageDescription">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                className="package-editmodal__textarea"
                value={description}
                placeholder="Description"
                row={5}
                onChange={this.handleChangeState('description')}
              />
              <span>*please do not include any links or phone numbers</span>
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    const {
      newServiceModalShow,
      editServiceModalShow,
    } = this.props;

    return (
      <Modal
        show={editServiceModalShow || newServiceModalShow}
        onHide={this.handleClose}
        dialogClassName="package-editmodal"
      >
        <Modal.Header closeButton closeLabel="&#x4d;">
          <Modal.Title id="add-service-modal" className="package-editmodal__title">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.addNewServiceform()}
        </Modal.Body>
        <Modal.Footer>
          <div className="package-editmodal__footer">
            <Button
              bsStyle="primary"
              bsSize="lg"
              className="package-editmodal__footer-button"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              bsStyle="primary"
              bsSize="lg"
              className="package-editmodal__footer-button"
              onClick={this.handleSave}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  newServiceModalShow: makeSelectNewServiceModalShow(),
  editServiceModalShow: makeSelectEditServiceModalShow(),
});

const mapDispatchToProps = {
  newServiceModalToggle,
  editServiceModalToggle,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'add-service',
  }),
)(AddServiceModal);
