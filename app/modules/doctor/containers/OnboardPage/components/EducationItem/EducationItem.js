import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import { isRequired } from 'utils/redux-form-validators';
import AddCircleButton from 'components/AddCircleButton';

import './style.scss';

class EducationItem extends Component {
  getYears() {
    const years = [];
    let startYear = startYear || 1950;

    while (startYear < moment().format('YYYY')) {
      startYear += 1;
      years.push(startYear);
    }

    return years;
  }

  render() {
    const {
      label,
      fields,
      meta: {
        touched,
        error,
        submitFailed,
      },
    } = this.props;

    return (
      <React.Fragment>
        <label>{label}</label>
        <div>
          {fields.map((item, index) => (
            <div key={`${item}_${index}`} className={`fields-wrap ${index ? 'nth-fields-wrap' : '1st-fields-wrap'}`}>
              <div className="fields-wrap__input">
                <Field
                  name={`${item}.school`}
                  component={ReduxFormFields.Input}
                  type="text"
                  placeholder="Univeristy Name"
                  validate={[isRequired]}
                />
                <Field
                  name={`${item}.major`}
                  component={ReduxFormFields.Input}
                  type="text"
                  placeholder="Major"
                  validate={[isRequired]}
                />
                <Row>
                  <Col sm={6}>
                    <Field
                      name={`${item}.startYear`}
                      component={ReduxFormFields.Select}
                      preLabel="From"
                      options={this.getYears()}
                      validate={[isRequired]}
                    />
                  </Col>
                  <Col sm={6}>
                    <Field
                      name={`${item}.endYear`}
                      component={ReduxFormFields.Select}
                      preLabel="To"
                      options={this.getYears()}
                      validate={[isRequired]}
                    />
                  </Col>
                </Row>
              </div>
              {index > 0 &&
                <i
                  className="fa fa-trash remove-fields"
                  onClick={() => fields.remove(index)}
                />
              }
            </div>
          ))}
          <AddCircleButton
            iconName="fa-plus"
            onClick={() => fields.push()}
            buttonLabel="Add Education"
          />
          {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
      </React.Fragment>
    );
  }
}

EducationItem.propTypes = {
  label: PropTypes.string,
};

export default EducationItem;
