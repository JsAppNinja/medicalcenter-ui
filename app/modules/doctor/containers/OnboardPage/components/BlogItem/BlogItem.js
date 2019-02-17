import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import {
  isRequired,
  isDate,
  isUrl,
} from 'utils/redux-form-validators';
import AddCircleButton from 'components/AddCircleButton';

import './style.scss';

class BlogItem extends Component {
  componentWillMount = () => {
    if (!this.props.fields.length) {
      this.props.fields.push();
    }
  }

  handleRemove = (index) => () => {
    this.props.fields.remove(index);
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
            <div key={`${item}_index`} className={`fields-wrap ${index ? 'nth-fields-wrap' : '1st-fields-wrap'}`}>
              <div className="fields-wrap__input">
                <Field
                  name={`${item}.title`}
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Title"
                  placeholder="Title"
                  validate={[isRequired]}
                />
                <Field
                  name={`${item}.url`}
                  component={ReduxFormFields.Input}
                  type="text"
                  label="URL"
                  placeholder="Link to your blog"
                  validate={[isRequired, isUrl]}
                />
                <Row>
                  <Col sm={6}>
                    <Field
                      name={`${item}.author`}
                      component={ReduxFormFields.Input}
                      type="text"
                      label="Author"
                      placeholder="Author"
                      validate={[isRequired]}
                    />
                  </Col>
                  <Col sm={6}>
                    <Field
                      name={`${item}.date`}
                      component={ReduxFormFields.Datepicker}
                      label="Date"
                      placeholder="Date"
                      dateFormat="MMMM Do, YYYY"
                      validate={[isRequired, isDate]}
                    />
                  </Col>
                </Row>
                <Field
                  name={`${item}.description`}
                  component={ReduxFormFields.TextField}
                  type="text"
                  label="Description"
                  placeholder="Description"
                  validate={[isRequired]}
                />
                <Field
                  name={`${item}.imgSrc`}
                  component={ReduxFormFields.Input}
                  type="text"
                  label="Image URL"
                  placeholder="Image URL"
                  validate={[isRequired, isUrl]}
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
            onClick={() => {
              fields.push();
            }}
            buttonLabel="Add another Article"
          />
          {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
      </React.Fragment>
    );
  }
}

BlogItem.propTypes = {
  label: PropTypes.string,
};

export default BlogItem;
