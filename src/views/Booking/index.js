import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";

import Page from "../../components/Page";
import Results from "./Results";

import TableToolbar from "../../components/TableToolbar";
import { getBooking } from "../../redux/booking/actions";
import Dialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const BookingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state.booking.data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/booking");
      console.log(data);
      dispatch(getBooking(data.data.bookings));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page className={classes.root} title="Bookings">
      <Container maxWidth={false}>
        <TableToolbar title="Booking" hideAddButton />
        <Box mt={3}>
          <Results bookings={bookingData} />
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default BookingListView;