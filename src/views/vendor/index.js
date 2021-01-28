import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";

import Page from "../../components/Page";
import Results from "./Results";
import { getVendor } from "../../redux/vendor/actions";
import TableToolbar from "../../components/TableToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VednorListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const vendorData = useSelector((state) => state.vendor.data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/vendor");
      dispatch(getVendor(data.data.vendors));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page className={classes.root} title="Vendors">
      <Container maxWidth={false}>
        <TableToolbar title="Vendor" hideAddButton />
        <Box mt={3}>
          <Results vendors={vendorData} />
        </Box>
      </Container>
    </Page>
  );
};

export default VednorListView;
