import React, { PropTypes, Component } from 'react'
import DataGrid from 'react-data-grid'
import { Toolbar } from 'react-data-grid-addons'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          key: 'id',
          name: 'ID',
          width: 80,
          filterable: true
        },
        {
          key: 'age',
          name: 'Actual Age',
          filterable: false
        },
        {
          key: 'name',
          name: 'Name',
          filterable: true
        }
      ]
    }
  }

  rowGetter(rowIndex) {
    // this.props.data[rowIndex]
    return {
      id: rowIndex,
      name: 'Name '+rowIndex,
      age: 'Real Age: '+rowIndex,
    }
  }

  getSize() {
    return 15;
  }

  handleFilterChange(filter) {
    console.log(filter);
  }

  onClearFilters() {
    console.log('Clear Filter')
  }

  render() {
    return (
      <DataGrid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        enableCellSelect={true}
        rowsCount={this.getSize()}
        minHeight={400}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters} />
    )
  }
}