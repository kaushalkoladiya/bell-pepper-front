import React from "react";
import MuiChip from "@material-ui/core/Chip";
import { colors } from "@material-ui/core";

import DoneIcon from "@material-ui/icons/DoneRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";

const AssignedVendor = () => {
  return (
    <MuiChip
      size="small"
      label={"Assigned"}
      style={{
        margin: 2,
      }}
      icon={
        <DoneIcon fontSize="small" style={{ color: colors.common.white }} />
      }
    />
  );
};
export default AssignedVendor;
