import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import h2p from "html2plaintext";

// Mui
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper, Typography } from "@material-ui/core";
import ErrorMessage from "./ErrorMessage";

const useStyles = makeStyles((theme) => ({
  textAreaContainer: {
    padding: 10,
    margin: "10px 0",
  },
}));

const TitleWithCharCount = ({ title, count }) => (
  <div>
    <Typography variant="h5" color="inherit">
      {title}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      Only {450 - count} character remains.
    </Typography>
  </div>
);

TitleWithCharCount.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const RichTextBox = ({
  title,
  onTextChange,
  placeholder,
  funcArg,
  error: _error,
  value,
  ...rest
}) => {
  const classes = useStyles();
  const [text, setText] = React.useState(
    RichTextEditor.createValueFromString(value, "html")
  );
  const [charLength, setCharLength] = React.useState(0);
  const [error, setError] = React.useState("");

  useEffect(() => setError(_error), [_error]);

  const handleRTChange = (e) => {
    onTextChange(funcArg, e.toString("html"));
    setText(e);
    const length = h2p(e.toString("html")).length;
    setCharLength(length);
    if (length > 450) {
      return setError("Text is too long!");
    } else {
      return setError("");
    }
  };

  return (
    <Paper className={classes.textAreaContainer}>
      <TitleWithCharCount title={title} count={charLength} />

      <RichTextEditor
        value={text}
        editorStyle={{
          border: error ? "2px solid red" : "none",
        }}
        onChange={handleRTChange}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage error={error} />
    </Paper>
  );
};

RichTextBox.propTypes = {
  title: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  funcArg: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default RichTextBox;
