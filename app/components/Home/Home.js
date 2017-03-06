import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonGroup, Radio, Label, FieldGroup } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import VirtualizedSelect from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Grid from '../Grid';
import './Home.scss'

const times = [
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' }
]


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alarmOptions: [],
      data: [],
      visible: false,
      visibleOptions: [],
      groupassignOptions: [],
      filterOptions: undefined,
      selectedRow: {},
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
      alarmOptions: json,
    })
    this.filterOptions = createFilterOptions({ json });
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
    }).catch((error) => {
      console.log(error)
    })
    fetch('public/Jsonfile/smartAlarmingGridData.json').then(response => response.json()).then((json) => {
      const entries = json.reduce((accu, elem) => {
        const groupAssign = elem["Group Assign"]
        if (!accu.some((el) => el.name === groupAssign)) {
          accu = [...accu, { name: groupAssign, id: groupAssign }];
        }
        return accu;
      }, [])
      this.setState({
        data: json,
        groupassignOptions: entries,
      })
    })
  }

  handleGroupAssignChange = (selectedValue) => {
    if (selectedValue) {
      this.setState({
        groupassign: selectedValue.value
      })
    } else {
      this.setState({
        groupassign: null
      })
    }
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

  render() {
    const { selectedRow, handleRowsSelected } = this.props;
    return (
      <div className="home-view">
        <div className="container col-md-9">
            <div className="grid">
              {/*<Grid data={this.state.data}/> */}
              <Grid data={this.state.data}  handleRowsSelected={handleRowsSelected}/>
            </div>
          </div>
          <div className="inner-container col-md-3">
            <div className="alarm-label">
              <div className="label">
                <span className="name">Alarm Name</span>
              </div>
              <div className="value">{selectedRow['Alert Name']}</div>
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
                      value={this.state.groupassign}
                      options={this.state.groupassignOptions}
                      onChange={this.handleGroupAssignChange}
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
    )
  }
}