import React, { PropTypes, Component } from 'react'
import DataGrid from 'react-data-grid'
import Modal from 'simple-react-modal'
import { Toolbar,  Data } from 'react-data-grid-addons'
import update from 'react-addons-update'

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
          key: 'alarmName',
          name: 'Alarm Name',
          resizable: true,
          sortable: true,
          filterable: true
        },
        {
          key: 'managerClass',
          name: 'Manager Class',
          resizable: true,
          sortable: true,
          filterable: true
        },
        {
          key: 'alarmDescription',
          name: 'Alarm Description',
          resizable: true,
          sortable: true,
          filterable: true
        },
        {
          key: "stats",
          name: "Stats",
          resizable: true,
          sortable: true,
          filterable: true,
          formatter: ColumnModal,
        },
        {
          key: 'considerations',
          name: 'Considerations',
          resizable: true,
          sortable: true,
          editable: true,
          filterable: true
        }
      ],
      rows: [],
      filters: {},
      sortColumn: {},
      sortDirection: 'ASC',
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        rows: nextProps.data,
      })
    }
  }

  componentDidMount () {
    if(this.grid) {
      this.grid.setState({
        selected: {},
      });
    }
  }


  rowGetter = (rowIndex) => {
    const data = this.getRows()
    const rowData = data[rowIndex];
    return rowData
  }

  getRows() {
    return Data.Selectors.getRows(this.state);
  }

  getSize() {
    return this.getRows().length;
  }

  getSize() {
    return this.getRows().length;
  }

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  }

  onClearFilters = () => {
    this.setState({filters: {} });
    //console.log('Clear Filter')
  }

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  }

  onCellSelected = ({ rowIdx, idx }) => {
    if (idx === 3) {
      this.setState({
        show: true,
        selectedRowId: rowIdx,
        selectedColumnId: idx,
        selectedRow: this.getRows()[rowIdx],
      })
    }
    this.props.handleRowsSelected(this.getRows()[rowIdx])
  }

  modalClose = () => {
    this.setState({
      show: false,
    }, () => {
      this.grid && this.grid.setState({
        selected: {},
      });
    });
  }

  handleRowsSelected = (rows) => {
    console.log(rows.map(r => r.rowIdx))
    this.setState({ selectedIndexes: rows.map(r => r.rowIdx) }, () => {
      this.props.onRowSelect(rows[0].row)
    });
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const { rows } = this.state;
    const row = Object.assign({}, rows[fromRow], updated);
    rows[fromRow] = row;
    this.setState({
      rows,
    }, () => {
      this.props.rowsUpdated && this.props.rowsUpdated();
    });
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
                {this.state.selectedRow && this.state.selectedRow["alerts"]}
              </div>
            </div>
            <div className="row">
              <div className="name">
                2016 Alerts Displayed
              </div>
              <div className="value">
                {this.state.selectedRow && this.state.selectedRow["alertsDisplayed"]}
              </div>
            </div>
              <div className="row">
                <div className="name">
                  YTD Alerts
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["ytdAlerts"]}
                </div>
            </div>
              <div className="row">
                <div className="name">
                  YTD Alerts Displayed
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["ytdAlertsDisplayed"]}
                </div>
             </div>
              <div className="row">
                <div className="name">
                  2016 Year Tickets
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["yearTickets"]}
                </div>
              </div>
               <div className="row">
                <div className="name">
                  YTD Tickets
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["ytdTickets"]}
                </div>
            </div>
             <div className="row">
                <div className="name">
                  Mitigated Alerts Based On Time Threshold
                </div>
                <div className="value">
                  {this.state.selectedRow && this.state.selectedRow["mitigatedAlertsBasedOnTimeThreshold"]}
                </div>
            </div>
          </div>
        </Modal>
        <DataGrid
          ref={grid => { this.grid = grid;}}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          enableCellSelect={true}
          rowsCount={this.getSize()}
          minHeight={562}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          enableCellSelect
          onCellSelected={this.onCellSelected}
          onClearFilters={this.onClearFilters}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          onGridSort={this.handleGridSort} />
      </div>
    )
  }
}