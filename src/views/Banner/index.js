import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBanner,
  getBanner,
  openBannerDialog,
  toggleIsLive,
  toggleShow,
} from "../../redux/banner/actions";

// MUI
import { Box, Container, makeStyles } from "@material-ui/core";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
// Components
import Page from "../../components/Page";
import TableToolbar from "../../components/TableToolbar";
import Dialog from "./Dialog";
import ToolTipButton from "../../components/ToolTipButton";
import Image from "../../components/Image";
import DataTable from "../../components/DataTable";
import IOSSwitch from "../../components/IOSSwitch";
// utils
import { warning, alert } from "../../utils/alert";
import { setDate } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Sticker = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState([]);

  const bannerData = useSelector((state) => state.banner.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/banner");
        dispatch(getBanner(data.data.banners));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setData(bannerData);
  }, [bannerData]);

  const handleOpenDialog = () => {
    dispatch(openBannerDialog());
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/banner/${id}`);
            if (data.status === 200) {
              dispatch(deleteBanner(id));
              alert("Deleted!", "Category has been deleted!", "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleIsLiveChange = async (id) => {
    try {
      const { data } = await axios.put(`/banner/toggleIsLive/${id}`);
      if (data.status === 200) dispatch(toggleIsLive({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowChange = async (id) => {
    try {
      const { data } = await axios.put(`/banner/toggleShow/${id}`);
      if (data.status === 200) dispatch(toggleShow({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Image",
      cell: (row) => <Image image={row.image} />,
    },
    {
      name: "Is Live",
      cell: (row) => (
        <IOSSwitch
          onChange={() => handleIsLiveChange(row._id)}
          checked={row.isLive}
        />
      ),
    },
    {
      name: "Show",
      cell: (row) => (
        <IOSSwitch
          onChange={() => handleShowChange(row._id)}
          checked={row.show}
        />
      ),
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
          <ToolTipButton title="Delete" onClick={() => handleDelete(row._id)}>
            <DeleteIcon color="error" />
          </ToolTipButton>
        </div>
      ),
    },
  ];

  return (
    <Page className={classes.root} title="Banner">
      <Container maxWidth={false}>
        <TableToolbar title="Banner" onAddButtonClick={handleOpenDialog} />
        <Box mt={3}>
          <DataTable data={data} title="Banners" columns={columns} />
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

Sticker.propTypes = {
  getStickers: PropTypes.func.isRequired,
};

export default Sticker;
