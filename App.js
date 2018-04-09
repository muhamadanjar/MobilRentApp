import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { compose, createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { middleware } from './src/utils/redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore} from 'redux-persist';

import createSocketIoMiddleware from "redux-socket.io";

import io from "socket.io-client/dist/socket.io";
let socket = io("http://localhost:9000", {jsonp:false});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server2/");

const log =  createLogger({ diff: true, collapsed: true });

const store = createStore(
  AppReducer,
  {},
  compose(
    applyMiddleware(middleware,thunk,log,socketIoMiddleware),
  ),
  
);
export const persistor = persistStore(store);

//type Props = {};
export default class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        
          <AppWithNavigationState />
        
      </Provider>
    );
  }
  /*renderPersist() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
