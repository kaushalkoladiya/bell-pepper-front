import React, { useEffect, useState } from "react";
import axios from "axios";
// mui
import { Box, Container, makeStyles } from "@material-ui/core";
import { DeleteIcon } from "../../components/Icon";
// redux
import { useSelector, useDispatch } from "react-redux";
import { deleteVendor, getVendor } from "../../redux/vendor/actions";
// components
import Page from "../../components/Page";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
// util
import { setDate } from "../../utils";
import { warning, alert } from "../../utils/alert";
import ToolTipButton from "../../components/ToolTipButton";
import ProfileName from "../../components/ProfileName";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VendorList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const vendorData = useSelector((state) => state.vendor.data);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(vendorData);
  }, [setData, vendorData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/vendor");
        dispatch(getVendor(data.data.vendors));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, setData]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = vendorData.filter((row) => {
        return (
          row?.companyName?.toUpperCase()?.indexOf(value) > -1 ||
          row?.email?.toUpperCase()?.indexOf(value) > -1 ||
          row?.mobile?.toUpperCase()?.indexOf(value) > -1 ||
          row?.address?.street?.toUpperCase()?.indexOf(value) > -1 ||
          row?.address?.houseNumber?.toUpperCase()?.indexOf(value) > -1 ||
          row?.address?.city?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(vendorData);
    }
  };

  const handleDelete = (id) => {
    const data = warning(
      "Make sure all the related booking and staff will be\n deleted automatically!"
    );
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/vendor/${id}`);
            if (data.status === 200) {
              dispatch(deleteVendor(id));
              alert("Deleted!", "Vendor has been deleted!", "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Category",
      cell: (row) => (
        <ProfileName
          name={row.categoryId.name}
          image={row.categoryId.image}
          square
        />
      ),
    },
    {
      name: "Company Name",
      selector: "companyName",
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
      name: "Address",
      cell: (row) =>
        `${row.address.houseNumber}, ${row.address.street} ${row.address.city}`,
      sortable: true,
    },
    {
      name: "Joined On",
      cell: (row) => setDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ToolTipButton title="Delete" onClick={() => handleDelete(row._id)}>
          <DeleteIcon color="error" />
        </ToolTipButton>
      ),
    },
  ];

  return (
    <Page className={classes.root} title="Vendors">
      <Container maxWidth={false}>
        <Box mt={3}>
          <DataTable
            data={data}
            title="Vendors"
            columns={columns}
            actions={<SearchBar title="Vendors" onSearch={handleSearch} />}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default VendorList;
