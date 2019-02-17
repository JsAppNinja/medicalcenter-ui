import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import './style.scss';

class LoadableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: props.limit,
    };
  }

  onLoadMore = () => {
    this.setState({
      limit: this.state.limit + this.props.limit,
    });
  }

  render() {
    const {
      items,
      className,
      children,
      btnText,
      btnClassName,
    } = this.props;
    const { limit } = this.state;
    const hasMoreLoadableList = items.length > limit;

    return (
      <div className={cx('loadable-list', className)}>
        {items.slice(0, limit)
          .map((item, index) => children(item, index))}
        {hasMoreLoadableList &&
          <div className={cx('loadable-list__buttons', btnClassName)}>
            <Button className="btn-cta btn-framed" onClick={this.onLoadMore}>
              {btnText}
            </Button>
          </div>}
      </div>
    );
  }
}

LoadableList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  children: PropTypes.func,
  limit: PropTypes.number,
  btnText: PropTypes.string,
  btnClassName: PropTypes.string,
};

LoadableList.defaultProps = {
  items: [],
  children: () => null,
  limit: 4,
  btnText: 'Load More',
};

export default LoadableList;
