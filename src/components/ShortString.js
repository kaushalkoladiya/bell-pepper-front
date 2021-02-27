import React from "react";
import { Button, makeStyles, Tooltip } from "@material-ui/core";
import toast from "react-hot-toast";
import { setEmptyStr, trimStr } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#263238",
    fontSize: "0.875rem",
    fontFamily: "Quicksand",
    fontWeight: 500,
    padding: 0,
    minWidth: 0,
    transition: "none",
    borderRadius: 0,
    textTransform: "none",
    lineHeight: 1.75,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  text: {
    padding: 0,
  },
}));

const ShortString = ({ string = "" }) => {
  const classes = useStyles();
  return (
    <Tooltip title={setEmptyStr(string)}>
      <Button
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        variant="text"
        onClick={() => {
          navigator.clipboard.writeText(string);
          toast("Copy To Clipboard");
        }}
        classes={{
          root: classes.root,
          text: classes.text,
        }}
      >
        {trimStr(setEmptyStr(string))}
      </Button>
    </Tooltip>
  );
};
export default ShortString;
