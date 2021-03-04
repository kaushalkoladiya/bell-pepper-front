import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
// Mui
import { colors } from "@material-ui/core";

const LineChart = ({ data, title = "" }) => {
  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              backgroundColor: colors.green[500],
              data: data.map((item) => item.count),
              label: `Total ${title}`,
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
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default LineChart;
