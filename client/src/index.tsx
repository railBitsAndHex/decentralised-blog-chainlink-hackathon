import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const mServerUrl:
  | string
  | undefined = `${process.env.REACT_APP_MORALIS_SERVER_URL}`;
const mAppId: string | undefined = `${process.env.REACT_APP_MORALIS_APPID}`;
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={mServerUrl} appId={mAppId}>
      <Router>
        <App />
      </Router>
    </MoralisProvider>
  </React.StrictMode>
);
