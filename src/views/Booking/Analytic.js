import React from "react";

import { Grid, makeStyles, Container } from "@material-ui/core";
import Page from "../../components/Page";

import Chart from "../../components/Chart";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  chartContainer: {
    maxHeight: 500,
  },
}));

const Analytic = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Bookings Analytic">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Chart
              url={"/reports/booking"}
              property={"bookings"}
              title={"Bookings"}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Analytic;
