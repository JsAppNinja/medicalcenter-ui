import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import './style.scss';

class DragSortableList extends Component {
  DragHandle = SortableHandle(() => (
    <div className={this.props.handlerClassName}>
      <span className="sortable-container__element-icon" />
    </div>
  ));

  SortableItem = SortableElement(({ value }) => (
    <div className="sortable-container__element">
      <this.DragHandle />
      {value}
    </div>
  ));

  SortableList = SortableContainer(({ items }) => (
    <div>
      {items.map((value, index) => (
        <this.SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  ));

  render() {
    const {
      items,
      onSortEnd,
      useDragHandle,
      transitionDuration,
      useWindowAsScrollContainer,
    } = this.props;

    return (
      <this.SortableList
        items={items}
        onSortEnd={onSortEnd}
        useDragHandle={useDragHandle}
        transitionDuration={transitionDuration}
        useWindowAsScrollContainer={useWindowAsScrollContainer}
      />
    );
  }
}

DragSortableList.propTypes = {
  items: PropTypes.array,
  onSortEnd: PropTypes.func,
  useDragHandle: PropTypes.bool,
  useWindowAsScrollContainer: PropTypes.bool,
  transitionDuration: PropTypes.number,
  handlerClassName: PropTypes.string,
};

DragSortableList.defaultProps = {
  items: [],
  onSortEnd: () => undefined,
  useDragHandle: false,
  transitionDuration: 300,
  useWindowAsScrollContainer: false,
};

export default DragSortableList;
