import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Divider, Typography, makeStyles, Paper } from "@material-ui/core";
import DatePicker from "../../components/DatePicker";
import LineChart from "./LineChart";

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

const CustomerChart = ({ title, property, url }) => {
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

CustomerChart.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
};

export default CustomerChart;
