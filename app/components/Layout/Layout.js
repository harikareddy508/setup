import React, { Component, PropTypes } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonGroup, Radio, Label } from 'react-bootstrap'

import './Layout.scss'

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
]

const times = [
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' }
]

export default class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleAlarmChange = (selectedValue) => {
    this.setState({
      alarm: selectedValue.value
    });
  }

  handleTimeChange = (selectedValue) => {
    this.setState({
      time: selectedValue.value
    })
  }

  handleCheckbox = (value) => {
    this.setState({
      callout: value
    })
  }

  render() {
    return (
      <div className="Layout">
        <header>
          <img className="image-header" src="" />
        </header>
        <div className="container">
          <div className="alarm-group">
            <label className="alarm-name">Alarm Name:</label>
            <Select
              className="select-alarm-name"
              name="form-field-name"
              value={this.state.alarm}
              options={options}
              onChange={this.handleAlarmChange}
            />
          </div>
          <div className="time-group">
            <label className="time-stamp">Time Stamp:</label>
            <Select
              className="select-time-stamp"
              name="form-field-name"
              value={this.state.time}
              options={times}
              onChange={this.handleTimeChange}
            />
          </div>
          <div className="radio-group">
            <label className="callout">Call Out:</label>
            <ButtonGroup>
                <Radio inline name="groupOptions" onChange={() => this.handleCheckbox('option 1')}>Option 1</Radio>
                <Radio inline name="groupOptions" onChange={() => this.handleCheckbox('option 2')}>Option 2</Radio>
            </ButtonGroup>
          </div>
          <button className="submit-button col-xs-2" type="submit">Submit</button>
        </div>
      </div>
    )
  }
}