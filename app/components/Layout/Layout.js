import React, { Component, PropTypes } from 'react'

import Grid from '../Grid'
import './Layout.scss'
export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: {},
    }
  }

  getApprovalCount(json) {
    this.setState({
      count: json,
    })
  }

  componentWillMount () {
    fetch ('url to post', {
        method: 'POST',
        body: JSON.stringify([{userName: 'approver3',}])
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.getApprovalCount(json)
    })
    .catch((error) => {
      console.log(error)
    })

    fetch('url to username').then(response => response.json()) .then((json) => {
      console.log(json)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleRowsSelected = (row) => {
    this.setState({
      selectedRow: row,
    });
  }

  render() {
    return (
      <div className="Layout">
        <header className="image-container">
          <img className="image-header" src="public/images/vzw-logo-156-130-c.jpeg" />
          <div>Username:<span>approver3</span></div>
        </header>
        <div className="content">
           <div className="menu">
              <ul id="top" role="navigation" class="nav navbar-nav" data-reactid="15">
                <li data-reactid="16" className="item">
                  <a href="/#/home" data-reactid="17">Home</a>
                </li>
                <li data-reactid="18" className="item">
                  <a href="/#/approvals-view" data-reactid="19">Approvals View</a>
                    {this.state.count && (
                      <div className="count">
                        <span className="number">{this.state.count}</span>
                      </div>
                    )}
                </li>
                <li data-reactid="20"><a href="/#/testers-view" data-reactid="21">Testers View</a></li>
                <li data-reactid="20"><a href="/#/approvals-production-view" data-reactid="21">Approvals Production View</a></li>
              </ul>
            </div>
            {React.cloneElement(this.props.children, {...this.props, handleRowsSelected: this.handleRowsSelected, selectedRow: this.state.selectedRow })}
          </div>
      </div>
      )
    }
  }