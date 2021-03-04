import React from "react";
import PropTypes from "prop-types";
// Mui
import { Divider, Typography, makeStyles, Paper } from "@material-ui/core";
// components
import DatePicker from "../DatePicker";
import LineChart from "./Line";
import axios from "axios";

const useStyles = makeStyles(() => ({
  dateContainer: {
    display: "flex",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px 5px 10px",
  },
  paper: {
    padding: 10,
  },
}));

const Chart = ({ title, url, property }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );
  const [endDate, setEndDate] = React.useState(new Date());
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { startDate, endDate };
        const { data: _data } = await axios.post(url, body);
        setData(_data.data[property]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDate, endDate, url, property]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.cardHeader}>
        <Typography variant="h4">{title}</Typography>
        <div className={classes.dateContainer}>
          <DatePicker
            onChange={setStartDate}
            date={startDate}
            title="Start From"
          />
          <DatePicker onChange={setEndDate} date={endDate} title="To" />
        </div>
      </div>
      <Divider />
      <LineChart data={data} title={title} />
    </Paper>
  );
};

Chart.propTypes = {};

export default Chart;
