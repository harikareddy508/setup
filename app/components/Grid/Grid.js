import React, { PropTypes, Component } from 'react'
import DataGrid from 'react-data-grid'
import Modal from 'simple-react-modal'
import { Toolbar } from 'react-data-grid-addons'

class ColumnModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: [],
      selectedRow: {},
    }
  }
  handleShowModal = (e) => {
    this.setState({
      show: true,
    })
  }

  render() {
    return (
      <div className="stats">
        <i className="fa fa-history" onClick={this.handleShowModal} />
      </div>
    )
  }
}

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          key: 'Manager Class',
          name: 'Manager Class',
          filterable: true
        },
        {
          key: 'Alert Name',
          name: 'Alert Name',
          filterable: true
        },
        {
          key: 'Alert Description',
          name: 'Alert Description',
          filterable: true
        },
        {
          key: "stats",
          name: "Stats",
          formatter: ColumnModal,
        },
        {
          key: 'Considerations',
          name: 'Considerations',
          filterable: true
        }
      ]
    }
  }


  rowGetter = (rowIndex) => {
    const { data } = this.props
    const rowData = data[rowIndex];
    return rowData
  }

  getSize() {
    return this.props.data.length;
  }

  handleFilterChange(filter) {
    console.log(filter);
  }

  onClearFilters() {
    console.log('Clear Filter')
  }

  onCellSelected = ({ rowIdx, idx }) => {
    if (idx === 3) {
      this.setState({
        show: true,
        selectedRowId: rowIdx,
        selectedColumnId: idx,
        selectedRow: this.props.data[rowIdx],
      })
    }
  }

  modalClose = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <Modal show={this.state.show} onClose={this.modalClose} transitionSpeed={500}>
          <div className="info">
            <div className="row">
              <div className="name">
                2016 Alerts
              </div>
              <div className="value">
                {this.state.selectedRow && this.state.selectedRow["2016 Alerts"]}
              </div>
            </div>
            <div className="row">
              <div className="name">
                2016 Alerts Displayed
              </div>
              <div className="value">
                {this.state.selectedRow && this.state.selectedRow["2016 Alerts Displayed"]}
              </div>
            </div>
              <div className="row">
                <div className="name">
                  YTD Alerts
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["YTD Alerts"]}
                </div>
            </div>
              <div className="row">
                <div className="name">
                  YTD Alerts Displayed
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["YTD Alerts Displayed"]}
                </div>
             </div>
              <div className="row">
                <div className="name">
                  2016 Year Tickets
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["2016 Year Tickets"]}
                </div>
              </div>
               <div className="row">
                <div className="name">
                  YTD Tickets
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["YTD Tickets"]}
                </div>
            </div>
             <div className="row">
                <div className="name">
                  Mitigated Alerts Based On Time Threshold
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["Mitigated Alerts Based On Time Threshold"]}
                </div>
            </div>
          </div>
        </Modal>
        <DataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          enableCellSelect={true}
          rowsCount={this.getSize()}
          minHeight={385}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          enableCellSelect
          onCellSelected={this.onCellSelected}
          onClearFilters={this.onClearFilters} />
      </div>
    )
  }
}