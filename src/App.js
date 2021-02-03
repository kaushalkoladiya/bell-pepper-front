import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import axios from "axios";
// redux
import { useDispatch, useSelector } from "react-redux";

import GlobalStyles from "./components/GlobalStyles";
import "./mixins/chartjs";
import theme from "./theme";
import routes from "./routes";
import { API_BASE_URL } from "./constrants";
import { loginAdmin, setAdminData } from "./redux/admin/actions";
import Axios from "axios";

axios.defaults.baseURL = API_BASE_URL;

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const routing = useRoutes(routes);

  const isAuth = useSelector((state) => state.admin.isAuth);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(loginAdmin(token));
  }, [token, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get("/admin");
        dispatch(setAdminData(data.data.admin));
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) fetchData();
  }, [isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
