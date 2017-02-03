import React, { Component, PropTypes } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonGroup, Radio, Label } from 'react-bootstrap'
import Grid from '../Grid'
import './Layout.scss'

const times = [
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' }
]

export default class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alarmOptions: [],
      data: [],
    }
  }

  handleAlarmChange = (selectedValue) => {
      if (selectedValue) {
        this.setState({
          alarm: selectedValue.value,
          alarmname: selectedValue.label,
      })
       } else {
          this.setState({
           alarm: null
      })
    }
  }


  sendToDB() {
    //this.state.alarm => 'selected value' => 123
    fetch('url to post', {
      method: 'POST',
      body: {
        id: this.state.alarm,
        name: this.state.alarmname,
        time: this.state.time,
        callout: this.state.callout,
        user: 'bolleha'
      } // {id: 123, firstname: 'harika', time: 'late'}
    }).then((response) => response.json()).then((json) => {
      console.log(json) //what ever be the response for POST request
      //this.parseResponse(json)
      fetch('url').then((innerResponse) => innerResponse.json()).then((innerJson) => {
        this.setState({
          data: innerJson,
        })
      })
    })
  }

  parseResponse(json) {
    console.log(json) // [{'id': 123, 'name': 'anil'}, {'id': 124, 'name': 'hari'}] or {'data': [{'id': 12132, 'name': 'sada'}]}
    const options = []
    for(var i = 0; i< json.length; i++) {
      options.push({
        label: json[i].name,
        value: json[i].id,
      })
    }//output? [{'value': 123, 'label': 'anil'}]
    //this.state.alarmOptions = options

    //const options = []
    //for(var i = 0; i< json.data.length; i++) {
    //options.push({
    //label: json.data[i].name,
    //value: json.data[i].id,
    //})
    //}
    //output? [{'value': 123, 'label': 'anil'}]
    //this.state.alarmOptions = options

    this.setState({
      alarmOptions: options
    })
  }

  componentWillMount() {
    fetch('url').then((response) => {
      return response.json()
    }).then((json) => {
      this.parseResponse(json)
    }).catch((error) => {
      console.log(error)
    })
  }

  handleTimeChange = (selectedValue) => {
    if (selectedValue) {
      this.setState({
        time: selectedValue.value
      })
    } else {
      this.setState({
        time: null
      })
    }
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
          <img className="image-header" src="public/images/download.png" />
        </header>
        <div className="container">
          <div className="alarm-group">
            <label className="alarm-name">Alarm Name:</label>
            <Select
              className="select-alarm-name"
              name="form-field-name"
              value={this.state.alarm}
              options={this.state.alarmOptions}
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
          <button className="submit-button" type="submit">Submit</button>
        </div>
        <div className="grid">
          {/*<Grid data={this.state.data}/> */}
          <Grid />
        </div>
      </div>
    )
  }
}