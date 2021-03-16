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
      light: colors.green[300],
      main: colors.green[500],
      dark: colors.green[700],
      contrastText: colors.common.white,
    },
    secondary: {
      main: colors.lightGreen[500],
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
        backgroundColor: "#f1f1f1",
        fontWeight: "bold",
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
    MuiAlertTitle: {
      root: {
        fontVariant: "all-petite-caps",
        fontWeight: "bold",
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
    MuiTextField: {
      variant: "outlined",
      size: "medium",
    },
    MuiSelect: {
      variant: "standard",
    },
    MuiFormControl: {
      variant: "outlined",
      size: "small",
      fullWidth: true,
    },
    MuiChip: {
      size: "small",
    },
  },
});

export default theme;
