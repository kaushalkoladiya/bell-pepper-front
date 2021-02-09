import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import { deleteService, openServiceDialog } from "../../redux/service/actions";

import Page from "../../components/Page";

import TableToolbar from "../../components/TableToolbar";
import { getService } from "../../redux/service/actions";
import Dialog from "./Dialog";
import { setDate } from "../../utils";
import Image from "../../components/Image";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { warning, alert } from "../../utils/alert";
import ToolTipButton from "../../components/ToolTipButton";

// icons
import EditIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";

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

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(serviceData);
  }, [serviceData, setData]);

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

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = serviceData.filter((row) => {
        return (
          row?.title?.toUpperCase()?.indexOf(value) > -1 ||
          row?.description?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(serviceData);
    }
  };

  const handleOpenDialog = () => {
    dispatch(openServiceDialog());
  };

  const handleOpenServiceDialog = (id) => {
    dispatch(openServiceDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/service/${id}`);
            if (data.status === 200) {
              dispatch(deleteService(id));
              alert("Deleted!", "Service has been deleted!", "success");
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
      name: "Image",
      cell: (row) => <Image image={row.image} />,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Created At",
      cell: (row) => setDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <ToolTipButton
            onClick={() => handleOpenServiceDialog(row._id)}
            title="Edit"
          >
            <EditIcon color="primary" />
          </ToolTipButton>
          <ToolTipButton title="Delete" onClick={() => handleDelete(row._id)}>
            <DeleteIcon color="error" />
          </ToolTipButton>
        </div>
      ),
    },
  ];

  return (
    <Page className={classes.root} title="data">
      <Container maxWidth={false}>
        <TableToolbar title="Service" onAddButtonClick={handleOpenDialog} />
        <Box mt={3}>
          <DataTable
            data={data}
            title="Services"
            columns={columns}
            actions={<SearchBar title="Services" onSearch={handleSearch} />}
          />
          {/* <Results data={data} /> */}
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default VendorListView;
