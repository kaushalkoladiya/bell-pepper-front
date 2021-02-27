import "react-perfect-scrollbar/dist/css/styles.css";
import "./mixins/chartjs";
// react router
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Mui
import { ThemeProvider } from "@material-ui/core";
// redux
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, setAdminData } from "./redux/admin/actions";
import store from "./redux/store";
import { openSnackbar } from "./redux/ui/actions";

// components
import GlobalStyles from "./components/GlobalStyles";

// theme
import theme from "./theme";

// utils
import { API_BASE_URL, ROOT_USER } from "./constants";

// routes
import { rootUserRoutes, vendorUserRoutes, defaultRoutes } from "./routes";
import Snackbar from "./components/Snackbar";

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use(
  (req) => {
    // const myPromise = Promise(req);
    // toast.promise(myPromise, {
    //   loading: "Loading",
    //   success: "Got the data",
    //   error: "Error when fetching",
    // });

    return req;
  },
  (err) => {}
);

axios.interceptors.response.use(
  (res) => {
    if (res.config.method !== "get") {
      const payload = { message: res.data.message, type: "success" };
      store.dispatch(openSnackbar(payload));
    }
    return res;
  },
  (err) => {
    const payload = { message: err?.response?.data?.message, type: "error" };
    store.dispatch(openSnackbar(payload));
    return Promise.reject(err);
  }
);

const App = () => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const dispatch = useDispatch();

  let routes;

  if (userType === ROOT_USER) routes = rootUserRoutes;
  else if (userType === "VENDOR_USER") routes = vendorUserRoutes;
  else routes = defaultRoutes;

  const routing = useRoutes(routes);

  const isAuth = useSelector((state) => state.admin.isAuth);

  useEffect(() => {
    if (!token || !userType) {
      return;
    }
    dispatch(loginAdmin({ token, userType }));
  }, [token, userType, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (userType === ROOT_USER) url = "/admin";
        else url = "/vendor/data";

        const { data } = await axios.get(url);
        dispatch(setAdminData(data.data.admin));
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) fetchData();
  }, [isAuth, userType, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <Toaster />
      <Snackbar />
    </ThemeProvider>
  );
};

export default App;
