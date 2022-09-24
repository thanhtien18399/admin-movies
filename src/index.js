import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import adminSlice from './featurns/admin/utils/adminSlice';
import profileSlice from './featurns/authentication/utils/authSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    ///khai báo reducer con 
    booking:adminSlice.reducer,
    auth:profileSlice.reducer,
  }
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
