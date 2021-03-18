import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { updateServiceDetails } from "../../../redux/service/actions";
// Mui
import { makeStyles, Paper } from "@material-ui/core";
// icons
import AddIcon from "../../../components/Icon/Add";
import CheckIcon from "../../../components/Icon/Check";
// components
import ToolTipButton from "../../../components/ToolTipButton";
import Title from "./Cleaning/Title";
import FieldBox from "./Cleaning/FieldBox";

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

const Detail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const detail = useSelector((state) => state.service.cleaning.detail);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(detail);
  }, [detail]);

  const handleChange = (value, index, key = "name") => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [key]: value,
    };
    setData(newData);
  };

  const handleClickAdd = () =>
    setData([...data, { name: "", description: "", price: 0 }]);

  const handleRemove = (index) =>
    setData([...data].filter((_, key) => key !== index));

  const handleSave = () =>
    dispatch(updateServiceDetails({ key: "detail", value: data }));

  return (
    <Paper className={classes.container}>
      <div className={classes.containerItems}>
        <div className={classes.displayFlex}>
          <Title title={"Details"} />
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
            fieldTitle={"Type"}
            title={item.name}
            value={item.price}
            onValueChange={handleChange}
            onRemove={handleRemove}
            id={key}
            richTextBox
            description={item.description}
          />
        ))}
      </div>
    </Paper>
  );
};

Detail.propTypes = {};

export default Detail;
