import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" autoClose={2000} />
      <App />
    </Provider>
  </React.StrictMode>
);
