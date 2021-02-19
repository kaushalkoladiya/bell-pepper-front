import React, { useState, useEffect } from "react";
import axios from "axios";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/category/actions";
import { getVendor } from "../../redux/vendor/actions";
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

import { ROOT_USER } from "../../constants";
import CustomerChart from "./CustomerChart";

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
  const dispatch = useDispatch();

  const userType = useSelector((state) => state.admin.userType);
  const isRootUser = userType === ROOT_USER ? true : false;

  const [counts, setCounts] = useState({
    bookings: 0,
    showBookings: false,
    services: 0,
    showServices: false,
    staffs: 0,
    showStaffs: false,
    users: 0,
    showUsers: false,
    vendors: 0,
    showVendors: false,
  });

  useEffect(() => {
    if (isRootUser) {
      const fetchData = async () => {
        try {
          const { data: _categoryData } = await axios.get("/category");
          dispatch(getCategory(_categoryData.data.categories));

          const { data: _vendorData } = await axios.get("/vendor");
          dispatch(getVendor(_vendorData.data.vendors));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [dispatch, isRootUser]);

  useEffect(() => {
    fetchData();
  }, [setCounts]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/admin/dashboard");
      setCounts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {counts.showUsers && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Card
                title={"Total Customers"}
                count={counts.users}
                icon={UsersIcon}
                color={colors.amber[600]}
                url={`/${isRootUser ? "admin" : "partners"}/customers`}
              />
            </Grid>
          )}
          {counts.showVendors && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Card
                title={"Total Vendors"}
                count={counts.vendors}
                icon={UsersIcon}
                color={colors.blue[600]}
                url={`/${isRootUser ? "admin" : "partners"}/vendors`}
              />
            </Grid>
          )}
          {counts.showServices && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Card
                title={"Total Services"}
                count={counts.services}
                icon={ServiceIcon}
                color={colors.cyan[600]}
                url={`/${isRootUser ? "admin" : "partners"}/services`}
              />
            </Grid>
          )}
          {counts.showBookings && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Card
                title={"Total Booking"}
                count={counts.bookings}
                icon={BookingIcon}
                color={colors.deepOrange[600]}
                url={`/${isRootUser ? "admin" : "partners"}/bookings`}
              />
            </Grid>
          )}
          {counts.showStaffs && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Card
                title={"Total Staffs"}
                count={counts.staffs}
                icon={UsersIcon}
                color={colors.deepPurple[600]}
                url={`/${isRootUser ? "admin" : "partners"}/staff`}
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12} lg={6}>
            <CustomerChart />
          </Grid>
          {/* <Grid item lg={8} md={12} xl={9} xs={12}>
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
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
