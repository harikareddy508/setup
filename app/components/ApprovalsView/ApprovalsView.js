import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ButtonGroup, Radio, Label, FieldGroup, Modal } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import createFilterOptions from 'react-select-fast-filter-options';
import Grid from '../Grid';

import './ApprovalsView.scss';

const times = [
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' }
]

export default class ApprovalsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alarmOptions: [],
      data: [],
      groupassignOptions: [],
      filterOptions: undefined,
      selectedRow: {},
      showModal: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedRow !== this.props.selectedRow) {
      this.setState({
        groupassign: nextProps.selectedRow['groupAssign'],
      });
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
    const { selectedRow } = this.props;
    fetch('url to post', {
      method: 'POST',
      body: [
        {
        alarm_id: selectedRow["alarmId"],
        alarm_name: selectedRow["alarmName"],
        threshold: this.state.time,
        callout: this.state.callout,
      }
      ]
    }).then((response) => response.json()).then((json) => {
      console.log(json)
    })
  }

  componentWillMount() {
    fetch('public/Jsonfile/tatt.json').then(response => response.json()).then((json) => {
      const entries = json.reduce((accu, elem) => {
        const groupAssign = elem["groupAssign"]
        if (groupAssign !== '' && !accu.some((el) => el.name === groupAssign)) {
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

  handleShowModal = (title) => {
    this.setState({
      title,
      showModal: true,
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleSuccess = () => {
    if (this.state.title === 'Approve') {
      this.sendToDB();
    }
    if (this.state.title === 'Reject') {
      // What should we do when he clicks on reject
    }

    this.setState({
      showModal: false,
    });
  }

  handleRejection = () => {
    if (this.state.title === 'Approve') {
      this.setState({
        showModal: false,
      })
    }
    if (this.state.title === 'Reject') {
      this.setState({
        showModal: false,
      })
    }
  }

  render() {
    const { selectedRow, handleRowsSelected } = this.props;
    return (
      <div className="home-view">
        <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Are you sure you want to {this.state.title} ticket automation
            </Modal.Title>
            <Modal.Footer>
              <button className="yes" onClick={this.handleSuccess}>Yes</button>
              <button className="no" onClick={this.handleRejection}>No</button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
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
              <div className="value">{selectedRow['alarmName']}</div>
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
                      valueKey="id"
                      labelKey="name"
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
                        value={selectedRow['time']}
                        options={times}
                        onChange={this.handleTimeChange}
                      />
                    </div>
                    <div className="radio-group">
                      <label className="callout">Call Out:</label>
                      <ButtonGroup>
                          <Radio inline name="groupOptions" checked={selectedRow['ticketNoCallout'] === 'Yes'} onChange={() => this.handleCheckbox('option 1')}>Yes</Radio>
                          <Radio inline name="groupOptions" checked={selectedRow['ticketNoCallout'] === 'No'} onChange={() => this.handleCheckbox('option 2')}>No</Radio>
                      </ButtonGroup>
                    </div>
                    <button className="submit-button" onClick={() => this.handleShowModal('Approve')}>Approve</button>
                     <button className="submit-button" onClick={() => this.handleShowModal('Reject')}>Reject</button>
                  </TabPanel>
                  <TabPanel>
                   <label className="ola-updated">Updated OLA</label>
                      <textarea className="text-ola" value={selectedRow && selectedRow['updatedOla']}>
                      </textarea>
                  </TabPanel>
                </Tabs>
              </div>
          </div>
      </div>
    )
  }
}