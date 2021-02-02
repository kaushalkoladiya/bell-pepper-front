import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import axios from "axios";
// redux
import { useDispatch } from "react-redux";

import GlobalStyles from "./components/GlobalStyles";
import "./mixins/chartjs";
import theme from "./theme";
import routes from "./routes";
import { API_BASE_URL } from "./constrants";
import { loginAdmin } from "./redux/admin/actions";

axios.defaults.baseURL = API_BASE_URL;

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const routing = useRoutes(routes);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(loginAdmin(token));
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
