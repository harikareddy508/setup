import React, { Component, PropTypes } from 'react'

import Grid from '../Grid'

export default class Layout extends Component {

  render() {
    return (
      <div className="Layout">
        <header className="image-container">
          <img className="image-header" src="public/images/vzw-logo-156-130-c.jpeg" />
        </header>
        <div className="content">
           <div className="menu">
              <ul id="top" role="navigation" class="nav navbar-nav" data-reactid="15">
                <li data-reactid="16"><a href="/#/home" data-reactid="17">Home</a></li>
                <li data-reactid="18"><a href="/#/approvals-view" data-reactid="19">Approvals View</a></li>
                <li data-reactid="20"><a href="/#/testers-view" data-reactid="21">Testers View</a></li>
                <li data-reactid="20"><a href="/#/approvals-production-view" data-reactid="21">Approvals Production View</a></li>
              </ul>
            </div>
            {this.props.children}
          </div>
      </div>
      )
    }
  }