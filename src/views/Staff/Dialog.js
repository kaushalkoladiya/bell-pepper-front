import React, { useEffect, useState } from "react";
import axios from "axios";
// mui
import { Box, Button, Container, makeStyles, Tooltip } from "@material-ui/core";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getStaffs } from "../redux/staff/actions";
// components
import Page from "../components/Page";
import DataTable from "../components/DataTable";
import { setDate, setEmptyStr, trimStr } from "../utils";
import SearchBar from "../components/SearchBar";
import ProfileName from "../components/ProfileName";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Staff = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const staffData = useSelector((state) => state.staff.data);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(staffData);
  }, [setData, staffData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/staff");
        dispatch(getStaffs(data.data.staffs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = staffData.filter((row) => {
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
      setData(staffData);
    }
  };

  const columns = [
    {
      name: "Name",
      cell: (row) => <ProfileName image={row.image} name={row.name} />,
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "mobile",
      sortable: true,
    },
    {
      name: "About",
      cell: (row) => (
        <Tooltip title={setEmptyStr(row.about)}>
          <Button
            className={classes.about}
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            variant="text"
          >
            {trimStr(setEmptyStr(row.about))}
          </Button>
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: "Joined On",
      cell: (row) => setDate(row.createdAt),
      sortable: true,
    },
  ];

  return (
    <Page className={classes.root} title="Staffs">
      <Container maxWidth={false}>
        <Box mt={3}>
          <DataTable
            data={data}
            title="Staffs"
            columns={columns}
            actions={<SearchBar title="Staffs" onSearch={handleSearch} />}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default Staff;
