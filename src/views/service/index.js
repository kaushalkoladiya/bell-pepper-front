import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";

import Page from "../../components/Page";
import Results from "./Results";

import TableToolbar from "../../components/TableToolbar";
import { getService } from "../../redux/service/actions";
import Dialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VendorListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const serviceData = useSelector((state) => state.service.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/service");
        dispatch(getService(data.data.services));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Services">
      <Container maxWidth={false}>
        <TableToolbar title="Service" hideAddButton />
        <Box mt={3}>
          <Results services={serviceData} />
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default VendorListView;
