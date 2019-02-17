import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormControl from 'react-bootstrap/lib/FormControl';

import './style.scss';

class BirthdatePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.any, // date or string or moment obj
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => undefined,
  }

  constructor(props) {
    super(props);

    this.state = {};
    if (props.defaultValue) {
      this.state = {
        ...this.getDateObj(props.defaultValue),
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (moment(this.props.value).diff(nextProps.value)) {
      this.setState({
        ...this.getDateObj(nextProps.value),
      });
    }
  }

  onChange = (field) => (evt) => {
    const val = evt.target.value;
    this.setState((prevState, props) => {
      const newState = {
        day: prevState.day,
        month: prevState.month,
        year: prevState.year,
        [field]: val,
      };

      if (newState.day && newState.month && newState.year) {
        props.onChange(moment([newState.year, newState.month, newState.day]).toDate());
      }
    });
  }

  getDateObj(date) {
    const momentObj = moment(date);
    return {
      day: momentObj.format('DD') * 1,
      month: momentObj.format('MM') * 1,
      year: momentObj.format('YYYY') * 1,
    };
  }

  renderDays() {
    const { day, month, year } = this.state;
    let dayCount = 31;
    if (month && year) {
      dayCount = new Date(year, month, 0).getDate();
    }

    const options = [
      <option value="" key="-">-</option>,
    ];
    for (let i = 1; i <= dayCount; i += 1) {
      options.push(<option value={i} key={`day_${i}`}>{i}</option>);
    }

    return (
      <FormControl
        className="birthdate-picker__day"
        componentClass="select"
        placeholder="Day"
        value={day}
        onChange={this.onChange('day')}
      >
        {options}
      </FormControl>
    );
  }

  renderMonth() {
    const { month } = this.state;
    const options = [
      <option value="" key="-">-</option>,
    ];
    for (let i = 0; i < 12; i += 1) {
      options.push(<option value={i + 1} key={`month_${i}`}>{moment().month(i).format('MMM')}</option>);
    }

    return (
      <FormControl
        className="birthdate-picker__month"
        componentClass="select"
        placeholder="select"
        value={month}
        onChange={this.onChange('month')}
      >
        {options}
      </FormControl>
    );
  }

  renderYear() {
    const { year } = this.state;
    const options = [
      <option value="" key="-">-</option>,
    ];
    for (let i = new Date().getFullYear(); i >= 1900; i -= 1) {
      options.push(<option value={i} key={`year_${i}`}>{i}</option>);
    }

    return (
      <FormControl
        className="birthdate-picker__year"
        componentClass="select"
        placeholder="select"
        value={year}
        onChange={this.onChange('year')}
      >
        {options}
      </FormControl>
    );
  }

  render() {
    return (
      <div className="birthdate-picker">
        {this.renderMonth()}
        {this.renderDays()}
        {this.renderYear()}
      </div>
    );
  }
}

export default BirthdatePicker;
