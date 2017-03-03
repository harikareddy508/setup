import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Layout from './components/Layout';
import Home from './components/Home';
import ApprovalsView from './components/ApprovalsView';
import './app.scss'


const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <Route path="/home" component={Home} />
      <Route path="/approvals-view" component={ApprovalsView} />
      <Route path="/testers-view" component={Home} />
      <Route path="/approvals-production-view" component={Home} />
    </Route>
  </Router>
)

const app = document.getElementById("app");
ReactDOM.render(<App />, app);