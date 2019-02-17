import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import { isRequired } from 'utils/redux-form-validators';
import AddCircleButton from 'components/AddCircleButton';

class MembershipItem extends Component {
  getYears() {
    const years = [];
    let startYear = startYear || 1980;

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
                  name={`${item}.title`}
                  component={ReduxFormFields.Input}
                  type="text"
                  placeholder="Title"
                  validate={[isRequired]}
                />
                <Field
                  name={`${item}.year`}
                  component={ReduxFormFields.Select}
                  options={this.getYears()}
                  validate={[isRequired]}
                />
                <Field
                  name={`${item}.description`}
                  component={ReduxFormFields.TextField}
                  type="text"
                  placeholder="Description"
                  validate={[isRequired]}
                />
              </div>
              {index !== 0 &&
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
            buttonLabel="Add another Award"
          />
          {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
      </React.Fragment>
    );
  }
}

MembershipItem.propTypes = {
  label: PropTypes.string,
};

export default MembershipItem;
