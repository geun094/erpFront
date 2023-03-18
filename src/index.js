import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import store from './Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = { store } >
    <App/>
  </Provider>
);