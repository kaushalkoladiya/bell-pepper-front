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
  addNewCategory,
  closeCategoryDialog,
  updateCategory,
} from "../../redux/category/actions";
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
  categoryAvatar: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
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

  const { isDialogOpen: open, data: _data, dialogId } = useSelector(
    (state) => state.category
  );

  const [mongoID, setMongoID] = useState(null);
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((category) => category._id === dialogId);
      if (index >= 0) {
        const category = _data[index];

        setMongoID(category._id);
        setName(category.name);
        setImagePath(category.image);
      }
    }
  }, [dialogId, _data]);

  useEffect(
    () => () => {
      setName("");
      setImageData(null);
      setImagePath(null);
      setMongoID(null);
      setErrors({ name: "" });
    },
    [open]
  );

  const [errors, setErrors] = useState({ name: "" });

  const handleClose = () => {
    dispatch(closeCategoryDialog());
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
    document.getElementById("categoryImage").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      return setErrors({ ...errors, name: "Invalid value." });
    }

    const formData = new FormData();
    if (imageData) formData.append("image", imageData);

    formData.append("name", name);

    try {
      if (dialogId && mongoID) {
        // Update
        const data = await networkRequest(
          `/category/${mongoID}`,
          "patch",
          formData
        );
        dispatch(updateCategory({ data: data.data.category, id: mongoID }));
        handleClose();
      } else {
        // Create
        const data = await networkRequest("/category", "post", formData);
        dispatch(addNewCategory(data.data.category));
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
        <Typography variant="h3">Main Service Details</Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className={classes.categoryDialog}>
            <div onClick={handleEditImage} style={{ textAlign: "center" }}>
              <input
                name="categoryImage"
                id="categoryImage"
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
            <div className={classes.nameRow}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name ? true : false}
                helperText={errors.name}
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
