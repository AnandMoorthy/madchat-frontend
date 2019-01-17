import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
// import logo from './logo.svg';
import './App.css';
import Router from './routes';

class App extends Component {
  constructor() {
        super();
        this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    }

  render() {
    return (
      <Provider store={this.store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
