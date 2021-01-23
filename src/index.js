import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";

// custom fonts
import './fonts/elements-lactosa-ZB8TLLJ-2019-12-19/TTF/Lactosa.ttf';
import './fonts/elements-merchant-ledger-W5S6NYS-2020-07-28/Web Fonts/MerchantLedgerRough.woff';
import "./fonts/elements-merchant-ledger-W5S6NYS-2020-07-28/Web Fonts/MerchantLedgerRoughThin.woff";
import "./fonts/elements-merchant-ledger-W5S6NYS-2020-07-28/Web Fonts/MerchantLedgerThin.woff";
import "./fonts/elements-merchant-ledger-W5S6NYS-2020-07-28/Web Fonts/MerchantLedgerRegular.woff"


import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
