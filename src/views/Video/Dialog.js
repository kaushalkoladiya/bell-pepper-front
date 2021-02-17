import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// MUI
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography } from "@material-ui/core";

// Icon
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";

// components
import ToolTipButton from "../../components/ToolTipButton";
import Image from "../../components/Image";
import TutorialDropdown from "../Tutorial/TutorialDropdown";
// utils
import { networkRequest } from "../../utils";
import {
  addNewVideo,
  closeVideoDialog,
  updateVideo,
} from "../../redux/video/actions";

const useStyles = makeStyles(() => ({
  closeDialog: {
    position: "absolute",
    right: "10px",
    top: "5px",
  },
  tutorialAvatar: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  titleRow: {
    margin: "10px 0",
  },
  submitButton: {
    textAlign: "right",
  },
  video: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  },
}));

const Dialog = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();

  const { isDialogOpen: open, data: _data, dialogId } = useSelector(
    (state) => state.video
  );

  const [mongoID, setMongoID] = useState(null);

  const [title, setTitle] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [videoPath, setVideoPath] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    video: "",
    tutorialId: "",
  });

  const tutorialId = params.tutorialId;

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((video) => video._id === dialogId);
      if (index >= 0) {
        const video = _data[index];

        setMongoID(video._id);
        // setTutorialId(video.tutorialId);
        setTitle(video.title);
        setVideoPath(video.video);
      }
    }
  }, [dialogId, _data]);

  useEffect(
    () => () => {
      // setTutorialId("");
      setTitle("");
      setVideoData(null);
      setVideoPath(null);
      setMongoID(null);
      setErrors({ title: "", video: "", tutorialId: "" });
    },
    [open]
  );

  const handleClose = () => {
    dispatch(closeVideoDialog());
  };

  const handleInputFileChange = (e) => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setVideoData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setVideoPath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditVideo = () => {
    document.getElementById("tutorialVideo").click();
  };

  // const handleTutorialChange = (e) => {
  //   setTutorialId(e.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tutorialId)
      return alert("Something went wrong! Please refresh the page.");

    if (mongoID) {
      if (!videoData && !videoPath)
        return setErrors({ ...errors, video: "Please select an video." });
    } else if (!mongoID) {
      if (!videoData || !videoPath)
        return setErrors({ ...errors, video: "Please select an video." });
    }
    if (!title) {
      return setErrors({ ...errors, title: "Invalid value." });
    }

    const formData = new FormData();
    if (videoData) formData.append("video", videoData);

    formData.append("title", title);
    formData.append("tutorialId", tutorialId);

    try {
      if (dialogId && mongoID) {
        // Update
        const data = await networkRequest(
          `/video/${mongoID}`,
          "patch",
          formData
        );
        dispatch(updateVideo({ data: data.data.video, id: mongoID }));
        handleClose();
      } else {
        // Create
        const data = await networkRequest("/video", "post", formData);
        // console.log(data);
        dispatch(addNewVideo(data.data.video));
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <ToolTipButton
        title="Close"
        onClick={handleClose}
        btnClass={classes.closeDialog}
      >
        <CloseIcon color="primary" />
      </ToolTipButton>
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h3">Tutorial Details</Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className={classes.tutorialDialog}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div onClick={handleEditVideo}>
                  <input
                    title="tutorialVideo"
                    id="tutorialVideo"
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={handleInputFileChange}
                  />

                  {videoPath ? (
                    <video controls className={classes.video}>
                      <source src={videoPath} />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  ) : (
                    <Image extraLarge video={videoPath} />
                  )}

                  {errors.video && (
                    <div style={{ textAlign: "center" }}>
                      <Typography variant="caption" color="error">
                        {errors.video}
                      </Typography>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TutorialDropdown
                  tutorial={tutorialId}
                  onChange={handleTutorialChange}
                /> */}
                <TextField
                  className={classes.titleRow}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                  label="Title"
                  pattern="^\w+(\s+\w+)*$"
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.submitButton}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
