import React from "react";
import MuiChip from "@material-ui/core/Chip";
import { colors } from "@material-ui/core";

const Chip = ({ label = "", color, icon, ...props }) => (
  <MuiChip
    label={label}
    style={{
      backgroundColor: color,
      color: colors.common.white,
      margin: 2,
    }}
    icon={icon}
    {...props}
  />
);
export default Chip;
