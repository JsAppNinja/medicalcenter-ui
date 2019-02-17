/* eslint-disable */
import PropTypes from "prop-types";
import React, { Component } from "react";
import Select from "react-select";
import debounce from "lodash/debounce";

// Import directly to avoid Webpack bundling the parts of react-virtualized that we are not using
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import {
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized/dist/commonjs/CellMeasurer";

export default class VirtualizedSelect extends Component {
  static propTypes = {
    async: PropTypes.bool,
    listProps: PropTypes.object,
    maxHeight: PropTypes.number,
    defaultOptionHeight: PropTypes.number,
    optionRenderer: PropTypes.func,
    selectComponent: PropTypes.func
  };

  static defaultProps = {
    async: false,
    maxHeight: 200,
    defaultOptionHeight: 35
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      listHeight: props.maxHeight
    };

    this._cache = new CellMeasurerCache({
      defaultHeight: props.defaultOptionHeight,
      minHeight: props.defaultOptionHeight,
      fixedWidth: true
    });

    this._cellMeasureRefs = {};
    this._renderMenu = this._renderMenu.bind(this);
    this._optionRenderer = this._optionRenderer.bind(this);
    this._setListRef = this._setListRef.bind(this);
    this._setSelectRef = this._setSelectRef.bind(this);
    this._setCellMeasureRef = this._setCellMeasureRef.bind(this);
  }

  remeasure = debounce(() => {
    this._cache.clearAll();
    if (this._listRef) {
      this._listRef.recomputeRowHeights();
    }

    if (this._cellMeasureRefs) {
      Object.keys(this._cellMeasureRefs).forEach(key => {
        if (this._cellMeasureRefs[key]) {
          this._cellMeasureRefs[key]._maybeMeasureCell();
        }
      });
    }

    this.setState({
      listHeight: this._calculateListHeight(this._cache._rowCount)
    });
  }, 50);

  /** See List#recomputeRowHeights */
  recomputeOptionHeights(index = 0) {
    if (this._listRef) {
      this._listRef.recomputeRowHeights(index);
    }
  }

  /** See Select#focus (in react-select) */
  focus() {
    if (this._selectRef) {
      return this._selectRef.focus();
    }
  }

  render() {
    const SelectComponent = this._getSelectComponent();

    return (
      <SelectComponent
        {...this.props}
        ref={this._setSelectRef}
        menuRenderer={this._renderMenu}
        menuStyle={{ overflow: "hidden" }}
        onOpen={this.remeasure}
        onInputChange={this.remeasure}
      />
    );
  }

  // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing
  _renderMenu({
    focusedOption,
    focusOption,
    labelKey,
    onSelect,
    options,
    selectValue,
    valueArray,
    valueKey
  }) {
    const { listProps, optionRenderer } = this.props;
    const focusedOptionIndex = options.indexOf(focusedOption);
    const height = this._calculateListHeight(options.length);
    const innerRowRenderer = optionRenderer || this._optionRenderer;

    // react-select 1.0.0-rc2 passes duplicate `onSelect` and `selectValue` props to `menuRenderer`
    // The `Creatable` HOC only overrides `onSelect` which breaks an edge-case
    // In order to support creating items via clicking on the placeholder option,
    // We need to ensure that the specified `onSelect` handle is the one we use.
    // See issue #33

    function wrappedRowRenderer({ index, key, style, parent }) {
      const option = options[index];

      return innerRowRenderer({
        focusedOption,
        focusedOptionIndex,
        focusOption,
        key,
        labelKey,
        onSelect,
        option,
        optionIndex: index,
        options,
        selectValue: onSelect,
        style,
        valueArray,
        valueKey,
        parent
      });
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            className="VirtualSelectGrid"
            height={this.state.listHeight}
            ref={this._setListRef}
            rowCount={options.length}
            rowHeight={this._cache.rowHeight}
            rowRenderer={wrappedRowRenderer}
            scrollToIndex={focusedOptionIndex}
            width={width}
            deferredMeasurementCache={this._cache}
            {...listProps}
          />
        )}
      </AutoSizer>
    );
  }

  _calculateListHeight(numRows) {
    const { maxHeight, defaultOptionHeight } = this.props;

    let height = 0;
    for (let index = 0; index < numRows; index++) {
      height += this._cache.getHeight(index);
      if (height > maxHeight) {
        return maxHeight;
      }
    }

    if (!height) return defaultOptionHeight;
    return height;
  }

  _getSelectComponent() {
    const { async, selectComponent } = this.props;

    if (selectComponent) {
      return selectComponent;
    } else if (async) {
      return Select.Async;
    } else {
      return Select;
    }
  }

  _optionRenderer({
    focusedOption,
    focusOption,
    key,
    labelKey,
    option,
    optionIndex,
    selectValue,
    style,
    valueArray,
    parent
  }) {
    const className = ["VirtualizedSelectOption"];

    if (option === focusedOption) {
      className.push("VirtualizedSelectFocusedOption");
    }

    if (option.disabled) {
      className.push("VirtualizedSelectDisabledOption");
    }

    if (valueArray && valueArray.indexOf(option) >= 0) {
      className.push("VirtualizedSelectSelectedOption");
    }

    if (option.className) {
      className.push(option.className);
    }

    const events = option.disabled
      ? {}
      : {
          onClick: () => selectValue(option),
          onMouseEnter: () => focusOption(option)
        };

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={optionIndex}
        ref={ref => this._setCellMeasureRef(key, ref)}
      >
        <div
          className={className.join(" ")}
          key={key}
          style={style}
          title={option.title}
          {...events}
        >
          {option[labelKey]}
        </div>
      </CellMeasurer>
    );
  }

  _setListRef(ref) {
    this._listRef = ref;
  }

  _setSelectRef(ref) {
    this._selectRef = ref;
  }

  _setCellMeasureRef(key, ref) {
    this._cellMeasureRefs[key] = ref;
  }
}
