// BootStrap , BootsWatch 의존성 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.min.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
