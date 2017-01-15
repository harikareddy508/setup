import React, { Component, PropTypes } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

import './Layout.scss'

export default class Layout extends Component {
  //.Layout { .button-toolbar {}}
  render() {
    return (
      <div className="Layout">
        <ButtonToolbar className="button-toolbar">
          <Button className="link-button" href="#">Link</Button>
          <Button className="Layout button">Button</Button>
        </ButtonToolbar>
      </div>
    )
  }
}