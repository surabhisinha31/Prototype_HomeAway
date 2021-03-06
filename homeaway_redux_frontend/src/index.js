import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import storeManager from './reducers/allreducer';
import createLogger from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import {userLoggedIn} from './actions/index'

const store = createStore(
    storeManager,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, promise)
);
ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
