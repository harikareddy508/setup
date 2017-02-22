import React, { Component, PropTypes } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonGroup, Radio, Label, FieldGroup } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import Grid from '../Grid'
import './Layout.scss'

const options = [
    { value: '3', label: 'harika' },
    { value: '4', label: 'reddy' },
    { value: '6', label: 'anil' }
]

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
      visible: false,
      visibleOptions: [],
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
            alarm: null,
            alarmname: null,
        })
    }
  }


  sendToDB = () => {
    //this.state.alarm => 'selected value' => 123
    fetch('url to post', {
      method: 'POST',
      body: [
        {
        alarm_id: this.state.alarm,
        alarm_name: this.state.alarmname,
        threshold: this.state.time,
        callout: this.state.callout,
      }
      ]
    }).then((response) => response.json()).then((json) => {
      console.log(json)
    })
  }

  parseResponse(json) {
    this.setState({
      alarmOptions: json
    })
  }

  constructOptions(arrayOfOptions) {
    const options = []
    for(var i = 0; i< arrayOfOptions.length; i++) {
      options.push({
        label: arrayOfOptions[i].name,
        value: arrayOfOptions[i].id,
      })
    }
    return options;
  }

  componentWillMount() {
    fetch('public/Jsonfile/alarms.json').then((response) => {
      return response.json()
    }).then((json) => {
      this.parseResponse(json)
      // this.setState({
      //   visibleOptions: this.constructOptions(this.state.alarmOptions.slice(0, 50))
      // })
    }).catch((error) => {
      console.log(error)
    })
    fetch('public/Jsonfile/smartAlarmingGridData.json').then(response => response.json()).then((json) => {
      console.log(json);
      this.setState({
        data: json,
      })
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

  handleClickOnMenu = (e) => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  getOptions = (input, callback) => {
    let filteredResults = this.state.alarmOptions.filter((option) => {
          return option.name.toLowerCase().startsWith(input.toLowerCase())
    }).slice(0, 50);
    if (input === "") {
      filteredResults = this.state.alarmOptions.slice(0, 50);
    }
    callback(null, { options: this.constructOptions(filteredResults) });
  }

  render() {
    return (
      <div className="Layout">
        <header className="image-container">
          <img className="image-header" src="public/images/vzw-logo-156-130-c.jpeg" />
        </header>
        <div className="content">
          <Icon name="list layout" onClick={this.handleClickOnMenu} />
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <div>
                  <div className="container col-md-9">
                      <div className="alarm-group">
                        <label className="alarm-name">Alarm Name:</label>
                        <Select.Async
                          className="select-alarm-name"
                          name="form-field-name"
                          value={this.state.alarm}
                          loadOptions={this.getOptions}
                          onChange={this.handleAlarmChange}
                          options={this.state.visibleOptions}
                        />
                      </div>
                      <div className="grid">
                        {/*<Grid data={this.state.data}/> */}
                        <Grid data={this.state.data} />
                      </div>
                    </div>
                    <div className="inner-container col-md-3">
                      <div className="alarm-label">
                        <div className="label">
                          <span className="name">Alarm Name</span>
                        </div>
                        <div className="value">{this.state.alarmname}</div>
                      </div>
                      <div className="tabs">
                        <Tabs>
                          <TabList>
                            <Tab>Ticket Automation</Tab>
                            <Tab>OLA</Tab>
                          </TabList>
                          <TabPanel>
                            <div className="assign-group">
                              <label className="groupassign">Group Assign:</label>
                              <Select
                                className="select-group-assign"
                                name="form-field-name"
                                value={this.state.time}
                                options={times}
                                onChange={this.handleTimeChange}
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
                              <button className="submit-button" onClick={this.sendToDB} type="submit">Submit</button>
                            </TabPanel>
                            <TabPanel>
                              OLA
                            </TabPanel>
                          </Tabs>
                        </div>
                    </div>
                  </div>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
      </div>
      )
    }
  }