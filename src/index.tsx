import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "App";
import configureStore from "./redux/configure-store";
import "./index.css";
import "./index.overrides.css";

const BITMEX_URL_MN = "wss://www.bitmex.com";
const BITMEX_URL_TN = "wss://testnet.bitmex.com";
const ENDPOINT = "/realtime";
const VERB = "GET";
const API_KEY_MN = "tKqi0WJDG7BXAyZsVpGW7zpb";
const API_KEY_TN = "vxhLX3oTaI2BZOiKihxH6onT";
const API_SECRET_MN = "37H7y09Q2mzxVOoA81yy4k5igcm_SDvKU4zbhxDv1hs920n_";
const API_SECRET_TN = "Yodc7Kva4arK7SMCVZ4nECgBbMc_jfTsKVB1aWA3RM8DfYOP";
const EXPIRES = Date.now() + 5;

export const getBitmexCredentials = (mainnet: boolean) =>
  mainnet
    ? {
        url: BITMEX_URL_MN,
        endpoint: ENDPOINT,
        verb: VERB,
        key: API_KEY_MN,
        secret: API_SECRET_MN,
        expires: EXPIRES,
      }
    : {
        url: BITMEX_URL_TN,
        endpoint: ENDPOINT,
        verb: VERB,
        key: API_KEY_TN,
        secret: API_SECRET_TN,
        expires: EXPIRES,
      };

const store = configureStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = document.getElementById("root");

ReactDOM.render(app, root);
