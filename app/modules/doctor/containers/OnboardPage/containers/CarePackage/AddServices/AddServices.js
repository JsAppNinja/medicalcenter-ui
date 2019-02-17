import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import AddServiceModal from '../AddServiceModal';
import {
  newServiceModalToggle,
  editServiceModalToggle,
} from '../../../redux/actions';
import {
  makeSelectNewServiceModalShow,
  makeSelectEditServiceModalShow,
} from '../../../redux/selectors';

import './style.scss';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px ${grid * 2}px`,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  width: 'fit-content',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  width: 350,
  height: 400,
  overflow: 'auto',
  border: '1px solid #a6a6a6',
});

class AddServices extends Component {
  state = {
    items: getItems(10),
    selected: getItems(0),
    serviceTitle: '',
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const moveResult = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: moveResult.droppable,
        selected: moveResult.droppable2,
      });
    }
  };

  getList = (id) => this.state[this.id2List[id]];
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  handleNewServiceModalShow = () => {
    this.props.newServiceModalToggle(true);
  }

  handleEditServiceModalShow = (title) => () => {
    this.props.editServiceModalToggle(true);
    this.setState({ serviceTitle: title });
  }

  render() {
    const {
      newServiceModalShow,
      editServiceModalShow,
    } = this.props;

    return (
      <div className="form-group service-dragdrop">
        <div className="service-dragdrop__context">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided1, snapshot1) => (
                        <div
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          style={getItemStyle(
                            snapshot1.isDragging,
                            provided1.draggableProps.style
                          )}
                          onClick={this.handleEditServiceModalShow(item.content)}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.selected.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided1, snapshot1) => (
                        <div
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          style={getItemStyle(
                            snapshot1.isDragging,
                            provided1.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="service-dragdrop__message">
          *Please select and drag any service item you wish to display from left to right
        </div>
        <Button bsStyle="primary" className="service-dragdrop__button" onClick={this.handleNewServiceModalShow}>
          Add New Service Item +
        </Button>
        {editServiceModalShow &&
          <AddServiceModal
            title="Add Existing Service Item"
            isEditServiceModal
            serviceTitle={this.state.serviceTitle}
          />
        }
        {newServiceModalShow &&
          <AddServiceModal
            title="Add New Service Item"
          />
        }
      </div>
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

export default withConnect(AddServices);
