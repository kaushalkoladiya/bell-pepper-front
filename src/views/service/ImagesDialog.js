import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import { useTheme, makeStyles } from "@material-ui/core/styles";

// Icon
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";
import ToolTipButton from "../../components/ToolTipButton";
import { closeServiceDialog, updateService } from "../../redux/service/actions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  closeDialog: {
    position: "absolute",
    right: "10px",
    top: "5px",
  },
  formRow: {
    margin: "10px 0 0 0",
  },
  categoryDialog: {
    display: "flex",
    alignItems: "center",
  },
  categoryAvatar: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  submitButton: {
    textAlign: "right",
    marginTop: 20,
  },
  displayFlex: {
    display: "flex",
  },
  justifyContentSpaceEvenly: {
    justifyContent: "space-evenly",
  },
  fileDropper: {
    minWidth: 400,
    minHeight: 200,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    textAlign: "center",
    padding: 10,
    position: "relative",
  },
  imageChooserText: {
    position: "absolute",
    left: "35%",
    top: "45%",
  },
}));

const ImagesDialog = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();

  const fileInputRef = useRef(null);

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { dialogId, isDialogOpen: open } = useSelector(
    (state) => state.service
  );

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    () => () => {
      setImages([]);
      setError("");
    },
    [open]
  );

  const handleClose = () => dispatch(closeServiceDialog());

  const handleInputClick = () => {
    fileInputRef.current.click();
  };

  const handleInputFileChange = (event) => {
    const { files } = event.target;
    setImages([...images, ...files]);

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = document.createElement("img");
        img.src = reader.result;

        img.classList.add("sticker");

        img.style.width = "100px";
        img.style.height = "100px";
        img.style.borderRadius = "2px";
        img.style.margin = "5px";
        img.style.objectFit = "contain";
        document.getElementById("imageperviews").append(img);
      });
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (images.length === 0) return setError("Please choose an image");
    images.forEach((image) => formData.append("image", image));

    try {
      const { data } = await axios.post(
        `/service/coverImage/${dialogId}`,
        formData
      );
      if (data)
        dispatch(
          updateService({ data: data.data.service, id: formData.mongoID })
        );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MuiDialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-name"
      disableBackdropClick
    >
      <ToolTipButton
        title="Close"
        onClick={handleClose}
        btnClass={classes.closeDialog}
      >
        <CloseIcon color="primary" />
      </ToolTipButton>
      <DialogTitle id="responsive-dialog-name">Cover Images</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <input
            ref={fileInputRef}
            name="coverImage"
            id="coverImage"
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleInputFileChange}
          />

          <div
            id="imageperviews"
            className={classes.fileDropper}
            onClick={handleInputClick}
          >
            {images.length === 0 && (
              <div className={classes.imageChooserText}>Choose an image</div>
            )}
          </div>

          {error && (
            <div style={{ textAlign: "center" }}>
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            </div>
          )}
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

ImagesDialog.propTypes = {};

export default ImagesDialog;
