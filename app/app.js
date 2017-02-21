import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Layout from './components/Layout';
import './app.scss'


const app = document.getElementById("app");
ReactDOM.render(<Layout />, app);