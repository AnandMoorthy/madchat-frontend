import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route, hashHistory } from 'react-router';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'
// import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={hashHistory}>
              <Route path="/" component={LoginPage} />
              <Route path="/Home" component={HomePage} />
            </Router>
        );
    }
}
