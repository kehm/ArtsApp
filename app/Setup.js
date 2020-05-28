
/**
* @file Sets redux store and starts AppSetup
* @author Kjetil Fossheim
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppSetup from './AppSetup';
import configureStore from './lib/configureStore';

function Setup(): React.Component {
  class Root extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        store: configureStore(),
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <AppSetup />
        </Provider>
      );
    }
  }
  return Root;
}

export default Setup;
