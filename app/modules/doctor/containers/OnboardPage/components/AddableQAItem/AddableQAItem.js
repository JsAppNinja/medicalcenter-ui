import React, { Component } from 'react';
import ReduxFormFields from 'components/ReduxFormFields';
import { Field } from 'redux-form/immutable';
import Button from 'react-bootstrap/lib/Button';
import DragSortableList from 'components/DragSortableList';
import { isRequired } from 'utils/redux-form-validators';

import './style.scss';

class AddableQAItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidUpdate() {
    this.setDOMLists();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { fields } = this.props;
    fields.move(oldIndex, newIndex);
    this.setState({ items: this.getDOMLists() });
  };

  getDOMLists() {
    const { fields } = this.props;
    const list = [];

    fields.forEach((item, index) => {
      const domItem = (
        <div className="fields-wrap">
          <div className="fields-wrap__input">
            <Field
              name={`${item}.question`}
              component={ReduxFormFields.Input}
              type="text"
              label="Question"
              validate={[isRequired]}
            />
            <Field
              name={`${item}.answer`}
              component={ReduxFormFields.TextField}
              label="Answer"
              validate={[isRequired]}
            />
          </div>
          <i
            className="fa fa-trash remove-fields"
            onClick={this.handleRemoveItem(index)}
          />
        </div>
      );
      list.push(domItem);
    });

    return list;
  }

  setDOMLists() {
    const { items } = this.state;
    let list = [];
    list = this.getDOMLists();

    if (list.length !== items.length) {
      this.setState({ items: list });
    }
  }

  handleAddItem = () => {
    this.props.fields.push();
  }

  handleRemoveItem = (index) => () => {
    this.props.fields.remove(index);
  }

  render() {
    const {
      meta: {
        touched,
        error,
        submitFailed,
      },
    } = this.props;
    const { items } = this.state;

    return (
      <div>
        <DragSortableList
          handlerClassName="drag-handler"
          items={items}
          onSortEnd={this.onSortEnd}
          useDragHandle
          useWindowAsScrollContainer
        />
        <Button bsStyle="primary" onClick={this.handleAddItem}>
          Add a Q&A +
        </Button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    );
  }
}

export default AddableQAItem;
