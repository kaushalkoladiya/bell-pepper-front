import React, { useState, useEffect } from "react";
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTutorial,
  getTutorial,
  openTutorialDialog,
} from "../../redux/tutorial/actions";

// MUI
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

// components
import Page from "../../components/Page";
import Toolbar from "./Toolbar";
import Dialog from "./Dialog";
import { getVideo } from "../../redux/video/actions";
import { warning, alert } from "../../utils/alert";
import TutorialCard from "../../components/TutorialCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const { data: tutorialsData } = useSelector((state) => state.tutorial);

  useEffect(() => {
    setData(tutorialsData);
  }, [tutorialsData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: _tutorialsData } = await axios.get("/tutorial");
        dispatch(getTutorial(_tutorialsData.data.tutorials));
        const { data: _videoData } = await axios.get("/video");
        dispatch(getVideo(_videoData.data.videos));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleOpenDialog = (id = null) => {
    dispatch(openTutorialDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/tutorial/${id}`);
            if (data.status === 200) {
              dispatch(deleteTutorial(id));
              alert(
                "Deleted!",
                "Tutorial has been deleted successfully!",
                "success"
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Page className={classes.root} title="Tutorials">
      <Container maxWidth={false}>
        <Toolbar onAddButtonClick={handleOpenDialog} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {data.map((item) => (
              <TutorialCard
                key={item._id}
                data={item}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box> */}
      </Container>
      <Dialog />
    </Page>
  );
};

export default ProductList;
