import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { openSnackbar } from "./redux/ui/actions";
import reportWebVitals from "./reportWebVitals";

axios.interceptors.response.use(
  (res) => {
    const payload = { message: res.data.message, type: "success" };
    store.dispatch(openSnackbar(payload));
    return res;
  },
  (err) => {
    const payload = { message: err?.response?.data?.message, type: "error" };
    store.dispatch(openSnackbar(payload));
    return Promise.reject(err);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
