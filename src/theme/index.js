import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.indigo[500],
    },
    secondary: {
      main: colors.indigo[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
  overrides: {
    MuiTableCell: {
      root: {
        padding: 2,
      },
      body: {
        textAlign: "center",
      },
      head: {
        textAlign: "center",
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        color: "#f5f5f9",
        maxWidth: 220,
        border: "1px solid #dadde9",
      },
      arrow: {
        color: "rgba(0, 0, 0)",
      },
    },
  },
  props: {
    MuiIcon: {
      fontSize: "small",
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiButton: {},
  },
});

export default theme;
