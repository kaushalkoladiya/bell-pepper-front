import React from "react";
import MuiChip from "@material-ui/core/Chip";
import { colors } from "@material-ui/core";

import DoneIcon from "@material-ui/icons/DoneRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";

const Chip = ({ type = "success", label = "" }) => {
  const isSuccess = type === "success" ? true : false;
  return (
    <MuiChip
      size="small"
      label={label}
      style={{
        backgroundColor: isSuccess ? colors.indigo[500] : colors.red[500],
        color: colors.common.white,
        margin: 2,
      }}
      icon={
        isSuccess ? (
          <DoneIcon fontSize="small" style={{ color: colors.common.white }} />
        ) : (
          <CancelIcon fontSize="small" style={{ color: colors.common.white }} />
        )
      }
    />
  );
};
export default Chip;
