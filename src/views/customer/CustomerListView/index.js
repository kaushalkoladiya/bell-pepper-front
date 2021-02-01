import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";

import Page from "../../../components/Page";
import Results from "./Results";
import { getUsers } from "../../../redux/user/actions";
import TableToolbar from "../../../components/TableToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/user");
        dispatch(getUsers(data.data.users));
      } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        console.log(error.response);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <TableToolbar title="Customer" hideAddButton />
        <Box mt={3}>
          <Results customers={userData} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
