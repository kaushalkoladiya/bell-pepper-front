import React, { useEffect, useState } from "react";
import axios from "axios";
// mui
import { Box, Container, makeStyles } from "@material-ui/core";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux/user/actions";
// components
import TableToolbar from "../components/TableToolbar";
import Page from "../components/Page";
import DataTable from "../components/DataTable";
import { setDate } from "../utils";
import SearchBar from "../components/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Location",
    selector: "location",
    sortable: true,
  },
  {
    name: "Phone",
    selector: "mobile",
    sortable: true,
  },
  {
    name: "Gender",
    selector: "gender",
    sortable: true,
  },
  {
    name: "DOB",
    cell: (row) => setDate(row.dob),
    sortable: true,
  },
  {
    name: "Lon-Lat",
    cell: (row) => `${row.lon} - ${row.lat}`,
    sortable: true,
  },
  {
    name: "City",
    selector: "city",
    sortable: true,
  },
  {
    name: "Joined On",
    cell: (row) => setDate(row.createdAt),
    sortable: true,
  },
  // {
  //   name: "Actions",
  //   cell: (row) => <div>{row._id}</div>,
  // },
];

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(userData);
  }, [setData, userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/user");
        dispatch(getUsers(data.data.users));
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, userData]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = userData.filter((row) => {
        return (
          row?.name?.toUpperCase()?.indexOf(value) > -1 ||
          row?.email?.toUpperCase()?.indexOf(value) > -1 ||
          row?.mobile?.toUpperCase()?.indexOf(value) > -1 ||
          row?.location?.toUpperCase()?.indexOf(value) > -1 ||
          row?.lat?.toUpperCase()?.indexOf(value) > -1 ||
          row?.gender?.toUpperCase()?.indexOf(value) > -1 ||
          row?.dob?.toUpperCase()?.indexOf(value) > -1 ||
          row?.city?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(userData);
    }
  };

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          <DataTable
            data={data}
            title="Customers"
            columns={columns}
            actions={<SearchBar title="Customer" onSearch={handleSearch} />}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
