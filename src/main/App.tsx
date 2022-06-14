import { Component } from 'react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Root } from '../containers/Root';
import { ConfigureStore } from '../__common__';

// Get the redux store
const store = ConfigureStore();

export class App extends Component {
    render () {
      return (
          <Provider store={store}>
            <Root/>
          </Provider>
      )
    }
  }