import React, { useState, useEffect } from "react";
import Axios from "axios";
// mui
import { Container, Grid, makeStyles, colors } from "@material-ui/core";
// icons
import {
  ShoppingBag as ServiceIcon,
  Users as UsersIcon,
  Briefcase as BookingIcon,
} from "react-feather";
// component
import Page from "../../components/Page";
import Card from "./Card";

import LatestOrders from "./LatestOrders";
import LatestProducts from "./LatestProducts";
import Sales from "./Sales";
import TrafficByDevice from "./TrafficByDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [counts, setCounts] = useState({
    bookings: 0,
    services: 0,
    staffs: 0,
    users: 0,
    vendors: 0,
  });

  useEffect(() => {
    fetchData();
  }, [setCounts]);

  const fetchData = async () => {
    try {
      const { data } = await Axios.get("/admin/dashboard");
      setCounts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Customers"}
              count={counts.users}
              icon={UsersIcon}
              color={colors.amber[600]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Vendors"}
              count={counts.vendors}
              icon={UsersIcon}
              color={colors.blue[600]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Services"}
              count={counts.services}
              icon={ServiceIcon}
              color={colors.cyan[600]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Booking"}
              count={counts.bookings}
              icon={BookingIcon}
              color={colors.deepOrange[600]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Staffs"}
              count={counts.staffs}
              icon={UsersIcon}
              color={colors.deepPurple[600]}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card
              title={"Total Staffs"}
              count={12}
              icon={UsersIcon}
              color={colors.green[600]}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
