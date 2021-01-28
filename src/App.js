import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import axios from "axios";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";

import GlobalStyles from "./components/GlobalStyles";
import "./mixins/chartjs";
import theme from "./theme";
import routes from "./routes";
import { API_BASE_URL } from "./constrants";

axios.defaults.baseURL = API_BASE_URL;

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
