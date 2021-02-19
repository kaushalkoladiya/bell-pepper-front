import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  Divider,
  colors,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import DatePicker from "../../components/DatePicker";
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

const CustomerChart = () => {
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
        const { data: _data } = await axios.post("/reports/customer", body);
        setData(_data.data.customers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.cardHeader}>
        <Typography variant="h4">Customers joined</Typography>
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
      <div>
        <Line
          data={{
            datasets: [
              {
                backgroundColor: colors.green[500],
                data: data.map((item) => item.count),
                label: "Total Customers",
                borderColor: "rgba(255, 99, 132, 1)",
                pointStyle: "circle",
                pointHoverBorderWidth: 3,
                pointBackgroundColor: "rgba(255, 99, 132, 0.5)",
                pointBorderColor: "rgba(255, 99, 132, 1)",
                pointHoverRadius: 15,
                pointRotation: 5,
                pointRadius: 5,
                fill: false,
              },
            ],
            labels: data.map((item) => item.date),
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </Paper>
  );
};

CustomerChart.propTypes = {};

export default CustomerChart;
