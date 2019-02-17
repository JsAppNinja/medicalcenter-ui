import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import FormTitle from 'components/FormTitle';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import ReduxFormFields from 'components/ReduxFormFields';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import PaddedDivider from 'components/PaddedDivider';
import { getPrice } from 'utils/currency';
import { isRequired, isNumeric } from 'utils/redux-form-validators';
import ScrollToTop from 'components/ScrollToTop';
import LABELS from '../../../constants/LABELS';
import JOINTS from '../../../constants/JOINTS';

import { makeSelectOnboardDoctorProfile } from '../../../redux/selectors';

import './style.scss';

class AddPackage extends Component {
  componentWillMount() {
    const { doctor, bundleId } = this.props;

    if (bundleId === 'new') {
      this.props.initialize({
        joints: [],
        labels: [],
      });
    } else {
      const bundle = doctor.get('bundles').find((b) => b.get('uuid') === bundleId);

      this.props.initialize({
        title: bundle.get('title'),
        minPrice: getPrice(bundle.get('min_price')),
        maxPrice: getPrice(bundle.get('max_price')),
        discount: getPrice(bundle.get('discount')),
        description: bundle.get('description'),
        labels: bundle.get('labels').toJS(),
        joints: bundle.get('joints').toJS(),
      });
    }
  }

  cancelEdit = () => {
    this.props.toggleEdit(null);
  }

  render() {
    const {
      handleSubmit,
      bundleId,
    } = this.props;

    return (
      <div>
        <FormTitle
          title={`${bundleId === 'new' ? 'Add a New ' : 'Edit '} Care Package`}
          hasButton
          buttonTitle={<span>×</span>}
          btnClassName="close-button"
          onClick={this.cancelEdit}
        />
        <div className="add-package">
          <Form className="add-package__form" onSubmit={handleSubmit}>
            <Row>
              <Col sm={12}>
                <Field
                  name="title"
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Title"
                  validate={[isRequired]}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Field
                  name="minPrice"
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Lowest Price($)"
                  validate={[isRequired, isNumeric]}
                />
              </Col>
              <Col sm={3}>
                <Field
                  name="maxPrice"
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Highest Price($)"
                  validate={[isRequired, isNumeric]}
                />
              </Col>
              <Col sm={3}>
                <Field
                  name="discount"
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Discount($)"
                  validate={[isRequired, isNumeric]}
                />
              </Col>
            </Row>
            <PaddedDivider />
            <Field
              name="description"
              component={ReduxFormFields.TextField}
              label="Description"
              validate={[isRequired]}
            />
            <span>*Please do not include any links or phone numbers</span>
            <PaddedDivider />
            <Row>
              <Col sm={12}>
                <div className="add-package__form-labels">
                  Labels:
                </div>
              </Col>
              <Col sm={12}>
                <Field
                  name="labels"
                  component={ReduxFormFields.ItemToggle}
                  items={LABELS}
                  hasAdd
                />
              </Col>
            </Row>
            <PaddedDivider />
            <Row>
              <Col sm={12}>
                <div className="add-package__form-labels">
                  Joints:
                </div>
              </Col>
              <Col sm={12}>
                <Field
                  name="joints"
                  component={ReduxFormFields.ItemToggle}
                  items={JOINTS}
                />
              </Col>
            </Row>
            {/* <PaddedDivider />
            <Row>
              <Col sm={12}>
                <div className="add-package__form-labels">
                  Services:
                </div>
              </Col>
              <Col sm={12}>
                <Field
                  name="services"
                  component={AddServices}
                  onClick={this.handleModalShow}
                />
              </Col>
            </Row> */}
            <PaddedDivider />
            <div className="add-package__form-footer">
              <Button
                type="submit"
                bsStyle="primary"
                bsSize="lg"
                className="footer__button"
              >
                Save Package
              </Button>
            </div>
          </Form>
        </div>
        <ScrollToTop />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  doctor: makeSelectOnboardDoctorProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  reduxForm({
    form: 'doctor-add-packages',
  }),
)(AddPackage);
