import React, { useEffect, useState } from "react";

// MUI
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

// Icon
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";
import ToolTipButton from "../../components/ToolTipButton";
import { makeStyles } from "@material-ui/core";
import Image from "../../components/Image";
import { addNewBanner, closeBannerDialog } from "../../redux/banner/actions";
import axios from "axios";

const useStyles = makeStyles(() => ({
  closeDialog: {
    position: "absolute",
    right: "10px",
    top: "5px",
  },
  bannerImage: {
    marginBottom: 10,
  },
  nameRow: {
    margin: "10px 0",
  },
  submitButton: {
    textAlign: "right",
  },
}));

const Dialog = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const open = useSelector((state) => state.banner.isDialogOpen);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setError("");
      setImageData(null);
      setImagePath("");
    }
  }, [open]);

  const handleClose = () => {
    dispatch(closeBannerDialog());
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
    document.getElementById("bannerImage").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageData || !imagePath) return setError("Please choose an image");

    const formData = new FormData();
    formData.append("image", imageData);
    try {
      const { data } = await axios.post("/banner", formData);
      console.log(data);
      dispatch(addNewBanner(data.data.banner));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-name"
    >
      <ToolTipButton
        title="Close"
        onClick={handleClose}
        btnClass={classes.closeDialog}
      >
        <CloseIcon color="primary" />
      </ToolTipButton>
      <DialogTitle id="responsive-dialog-name">
        <Typography variant="h3">Banner Image</Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div onClick={handleEditImage} className={classes.bannerImage}>
            <input
              name="bannerImage"
              id="bannerImage"
              type="file"
              hidden
              accept="image/*"
              onChange={handleInputFileChange}
            />
            <Image extraLarge image={imagePath} />
            {error && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              </div>
            )}
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
