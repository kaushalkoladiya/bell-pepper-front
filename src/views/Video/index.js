import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { openTutorialDialog } from "../../redux/tutorial/actions";

// MUI
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

// components
import Page from "../../components/Page";
import TutorialCard from "../../components/TutorialCard";
import Toolbar from "./Toolbar";
import Dialog from "./Dialog";
import { deleteVideo, openVideoDialog } from "../../redux/video/actions";
import { warning, alert } from "../../utils/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const Video = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState([]);

  const { data: videosData } = useSelector((state) => state.video);

  useEffect(() => {
    if (params.tutorialId) {
      const _tutorialId = params.tutorialId;

      const _data = videosData.filter(
        (item) => item.tutorialId === _tutorialId
      );
      setData(_data);
    }
    return () => setData([]);
  }, [params, videosData]);

  const handleOpenDialog = (id = null) => {
    dispatch(openVideoDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/video/${id}`);
            if (data.status === 200) {
              dispatch(deleteVideo(id));
              alert(
                "Deleted!",
                "Video has been deleted successfully form this tutorial!",
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
    <Page className={classes.root} title="Videos">
      <Container maxWidth={false}>
        <Toolbar onAddButtonClick={() => handleOpenDialog()} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {data.map((item) => (
              <TutorialCard
                key={item._id}
                video
                data={item}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default Video;
