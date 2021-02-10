import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  addNewService,
  closeServiceDialog,
  updateService,
} from "../../redux/service/actions";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

// icons
import CloseIcon from "@material-ui/icons/Close";

// components
import Image from "../../components/Image";
import ToolTipButton from "../../components/ToolTipButton";

// utile
import { networkRequest } from "../../utils";
import CategoryDropdown from "../Category/CategoryDropdown";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    right: "10px",
    top: "5px",
  },
  textCenter: {
    textAlign: "center",
    padding: 5,
  },
  submitButton: {
    textAlign: "right",
    marginTop: 20,
  },
  topSection: {
    alignItem: "center",
  },
  bottomSection: {
    marginTop: 20,
  },
  textField: {
    marginBottom: 10,
  },
}));

const Dialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mongoID, setMongoID] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const { dialogId, isDialogOpen: open, data: _data } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    return () => {
      setErrors({
        name: "",
        image: "",
        description: "",
        price: "",
        categoryId: "",
      });
      setMongoID(null);
      setCategoryId("");
      setTitle("");
      setDescription("");
      setPrice("");
      setImagePath("");
      setImageData("");
    };
  }, [open]);

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((item) => item._id === dialogId);
      if (index !== -1) {
        const _service = _data[index];

        setMongoID(_service._id);
        setCategoryId(_service.categoryId._id);
        setTitle(_service.title);
        setDescription(_service.description);
        setPrice(_service.price);
        setImagePath(_service.image);

        // setService(_data[index]);
      }
    }
  }, [dialogId, _data]);

  const handleClose = () => {
    dispatch(closeServiceDialog());
  };

  const handleInputFileChange = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditImage = () => {
    document.getElementById("serviceImage").click();
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
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

    if (!title) return setErrors({ ...errors, title: "Invalid title" });
    if (!categoryId)
      return setErrors({ ...errors, categoryId: "Please choose a category." });
    if (!description)
      return setErrors({ ...errors, description: "Invalid description" });
    if (!price) return setErrors({ ...errors, price: "Invalid price" });

    const formData = new FormData();
    if (imageData) formData.append("image", imageData);
    formData.append("categoryId", categoryId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    if (dialogId && mongoID) {
      // Update
      const data = await networkRequest(
        `/service/${mongoID}`,
        "patch",
        formData
      );
      dispatch(updateService({ data: data.data.service, id: mongoID }));
      handleClose();
    } else {
      // Create
      const data = await networkRequest("/service", "post", formData);
      dispatch(addNewService(data.data.service));
      handleClose();
    }
  };

  return (
    <MuiDialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
    >
      <DialogTitle id="simple-dialog-title">
        <ToolTipButton
          title="Close"
          onClick={handleClose}
          btnClass={classes.closeButton}
        >
          <CloseIcon />
        </ToolTipButton>
        <Typography variant="h3">Service Details</Typography>
      </DialogTitle>
      <MuiDialogContent>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Grid container className={classes.topSection} spacing={2}>
                <Grid item sm={12} md={6} lg={4}>
                  <div onClick={handleEditImage}>
                    <input
                      name="serviceImage"
                      id="serviceImage"
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
                </Grid>
                <Grid item sm={12} md={6} lg={8}>
                  <TextField
                    className={classes.textField}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title ? true : false}
                    helperText={errors.title}
                    label="Title"
                    pattern="^\w+(\s+\w+)*$"
                    fullWidth
                  />
                  <TextField
                    className={classes.textField}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    error={errors.price ? true : false}
                    helperText={errors.price}
                    label="Price"
                    type="number"
                    fullWidth
                  />
                  <CategoryDropdown
                    category={categoryId}
                    onChange={handleCategoryChange}
                    error={errors.categoryId}
                  />
                </Grid>
              </Grid>
            </div>
            <div item sm={12} className={classes.bottomSection}>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description ? true : false}
                helperText={errors.description}
                label="Description"
                pattern="^\w+(\s+\w+)*$"
                fullWidth
                multiline
                rows={4}
              />
            </div>
            <div item sm={12} className={classes.submitButton}>
              <Button variant="contained" color="primary" type="submit">
                {!mongoID ? "Submit" : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </MuiDialogContent>
    </MuiDialog>
  );
};

export default Dialog;
