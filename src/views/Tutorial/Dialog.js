import React, { useEffect, useState } from "react";

// MUI
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

// Icon
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addNewTutorial,
  closeTutorialDialog,
  updateTutorial,
} from "../../redux/tutorial/actions";
// components
import ToolTipButton from "../../components/ToolTipButton";
import Image from "../../components/Image";
import { networkRequest } from "../../utils";

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
}));

const Dialog = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isDialogOpen: open, data: _data, dialogId } = useSelector(
    (state) => state.tutorial
  );

  const [mongoID, setMongoID] = useState(null);
  const [title, setTitle] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((tutorial) => tutorial._id === dialogId);
      if (index >= 0) {
        const tutorial = _data[index];

        setMongoID(tutorial._id);
        setTitle(tutorial.title);
        setImagePath(tutorial.image);
      }
    }
  }, [dialogId, _data]);

  useEffect(
    () => () => {
      setTitle("");
      setImageData(null);
      setImagePath(null);
      setMongoID(null);
      setErrors({ title: "", image: "" });
    },
    [open]
  );

  const [errors, setErrors] = useState({ title: "", image: "" });

  const handleClose = () => {
    dispatch(closeTutorialDialog());
  };

  const handleInputFileChange = (e) => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditImage = () => {
    document.getElementById("tutorialImage").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mongoID) {
      if (!imageData && !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    } else if (!mongoID) {
      if (!imageData || !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    }
    if (!title) {
      return setErrors({ ...errors, title: "Invalid value." });
    }

    const formData = new FormData();
    if (imageData) formData.append("image", imageData);

    formData.append("title", title);

    try {
      if (dialogId && mongoID) {
        // Update
        const data = await networkRequest(
          `/tutorial/${mongoID}`,
          "patch",
          formData
        );
        dispatch(updateTutorial({ data: data.data.tutorial, id: mongoID }));
        handleClose();
      } else {
        // Create
        const data = await networkRequest("/tutorial", "post", formData);
        dispatch(addNewTutorial(data.data.tutorial));
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
      maxWidth="sm"
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
            <div onClick={handleEditImage}>
              <input
                title="tutorialImage"
                id="tutorialImage"
                type="file"
                hidden
                accept="image/*"
                onChange={handleInputFileChange}
              />
              <Image extraLarge image={imagePath} />
              {errors.image && (
                <div style={{ textAlign: "center" }}>
                  <Typography variant="caption" color="error">
                    {errors.image}
                  </Typography>
                </div>
              )}
            </div>
            <div className={classes.titleRow}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title ? true : false}
                helperText={errors.title}
                label="Title"
                pattern="^\w+(\s+\w+)*$"
              />
            </div>
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
