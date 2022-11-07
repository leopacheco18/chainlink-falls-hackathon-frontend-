import React from "react";

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import store from "./store";

import "./index.css";

import "antd/dist/antd.css";

import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </Provider>
  </React.StrictMode>
);
