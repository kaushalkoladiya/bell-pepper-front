import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { updateServiceDetails } from "../../../../redux/service/actions";
// Mui
import { makeStyles, Paper } from "@material-ui/core";
// icons
import AddIcon from "../../../../components/Icon/Add";
import CheckIcon from "../../../../components/Icon/Check";
// components
import ToolTipButton from "../../../../components/ToolTipButton";
import Title from "./Title";
import FieldBox from "./FieldBox";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "0 5px 5px 5px",
  },
  container: {
    margin: "10px 0",
    padding: 10,
  },
  containerItems: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  containerItem: {
    display: "flex",
    flexDirection: "row",
    margin: "5px 0",
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
  },
}));

const Hour = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const hour = useSelector((state) => state.service.cleaning.hour);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(hour);
  }, [hour]);

  const handleChange = (value, index, key = "number") => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [key]: value,
    };
    setData(newData);
  };

  const handleClickAdd = () => setData([...data, { number: 0, price: 0 }]);

  const handleRemove = (index) =>
    setData([...data].filter((_, key) => key !== index));

  const handleSave = () =>
    dispatch(updateServiceDetails({ key: "hour", value: data }));

  return (
    <Paper className={classes.container}>
      <div className={classes.containerItems}>
        <div className={classes.displayFlex}>
          <Title title={"Hours"} />
          <ToolTipButton title="New" onClick={handleClickAdd}>
            <AddIcon />
          </ToolTipButton>
        </div>
        <div>
          <ToolTipButton title="Save" onClick={handleSave}>
            <CheckIcon />
          </ToolTipButton>
        </div>
      </div>
      <div className={classes.bottomContainer}>
        {data.map((item, key) => (
          <FieldBox
            key={key}
            fieldTitle={"Hour"}
            title={item.number}
            value={item.price}
            onKeyValueChange={handleChange}
            onValueChange={handleChange}
            onRemove={handleRemove}
            id={key}
          />
        ))}
      </div>
    </Paper>
  );
};

Hour.propTypes = {};

export default Hour;
