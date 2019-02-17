import React, { Component } from 'react';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import { isRequired } from 'utils/redux-form-validators';
import AddCircleButton from 'components/AddCircleButton';

import './style.scss';

class AddableInput extends Component {
  handleRemove = (index) => () => {
    this.props.fields.splice(index, 1);
  }

  handleAdd = () => {
    this.props.fields.push();
  }

  render() {
    const {
      label,
      fields,
      placeholder,
      meta: {
        touched,
        error,
        submitFailed,
      },
    } = this.props;

    return (
      <div>
        <label>{label}</label>
        {fields.map((item, index) => (
          <div key={`${item}_${index}`} className={`fields-wrap ${index ? 'nth-fields-wrap' : '1st-fields-wrap'}`}>
            <div className="fields-wrap__input">
              <Field
                name={item}
                type="text"
                placeholder={placeholder}
                component={ReduxFormFields.Input}
                validate={[isRequired]}
              />
            </div>
            {index !== 0 &&
              <i
                className="fa fa-trash remove-fields"
                onClick={this.handleRemove(index)}
              />
            }
          </div>
        ))}
        <AddCircleButton
          iconName="fa-plus"
          onClick={this.handleAdd}
          buttonLabel="Add another Hospital Affiliation"
        />
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    );
  }
}

export default AddableInput;
