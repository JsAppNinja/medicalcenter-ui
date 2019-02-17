import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import { isRequired } from 'utils/redux-form-validators';
import AddCircleButton from 'components/AddCircleButton';

class PublicationItem extends Component {
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
                  name={`${item}.link`}
                  component={ReduxFormFields.Input}
                  type="text"
                  placeholder="Link"
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
            buttonLabel="Add another Publication"
          />
          {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
      </React.Fragment>
    );
  }
}

PublicationItem.propTypes = {
  label: PropTypes.string,
};

export default PublicationItem;
