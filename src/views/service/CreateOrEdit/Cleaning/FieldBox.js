import React from "react";
import PropTypes from "prop-types";
import { makeStyles, TextField } from "@material-ui/core";

import ToolTipButton from "../../../../components/ToolTipButton";

import CloseIcon from "../../../../components/Icon/Close";
import RichTextBox from "../../../../components/RichTextBox";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "0 5px 5px 5px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.grey[100],
    padding: 10,
    margin: "5px 0",
    borderRadius: 10,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    margin: "5px 0",
  },
  bottomSection: {
    marginTop: 5,
  },
}));

const FieldBox = ({
  fieldTitle = "Type",
  valueTitle = "Price",
  title,
  value,
  onValueChange,
  onRemove,
  id,
  description,
  richTextBox,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <TextField
          className={classes.textField}
          placeholder={fieldTitle}
          onChange={(e) => onValueChange(e.target.value, id)}
          value={title}
          label={fieldTitle}
          fullWidth
        />
        <TextField
          className={classes.textField}
          placeholder={valueTitle}
          onChange={(e) => onValueChange(e.target.value, id, "price")}
          value={value}
          label={richTextBox ? valueTitle + " (optional)" : valueTitle}
          type="number"
          fullWidth
        />
        <ToolTipButton title="Remove" onClick={() => onRemove(id)}>
          <CloseIcon />
        </ToolTipButton>
      </div>
      {richTextBox && (
        <div className={classes.bottomSection}>
          <RichTextBox
            title={"Description"}
            placeholder={"Description"}
            onTextChange={(key, value) => onValueChange(value, id, key)}
            funcArg={"description"}
            value={description}
          />
        </div>
      )}
    </div>
  );
};

FieldBox.propTypes = {
  fieldTitle: PropTypes.string,
  valueTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.number,
  description: PropTypes.string,
  richTextBox: PropTypes.bool,
};

export default FieldBox;
