import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addNewStaff, updateStaff } from "../../redux/staff/actions";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

// icons
import CloseIcon from "@material-ui/icons/Close";

// components
import Image from "../../components/Image";
import ToolTipButton from "../../components/ToolTipButton";

// utile
import { networkRequest } from "../../utils";
import { closeStaffDialog } from "../../redux/staff/actions";

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
  genderContainer: {
    flexDirection: "row",
  },
}));

const Dialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mongoID, setMongoID] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    nationality: "",
  });
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [errors, setErrors] = useState({
    image: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const { dialogId, isDialogOpen: open, data: _data } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    return () => {
      setErrors({
        image: "",
        name: "",
        about: "",
        email: "",
        mobile: "",
        gender: "",
        age: "",
        nationality: "",
      });
      setMongoID(null);
      setFormData({
        name: "",
        about: "",
        email: "",
        mobile: "",
        gender: "",
        age: "",
        nationality: "",
      });
      setImagePath("");
      setImageData("");
    };
  }, [open]);

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((item) => item._id === dialogId);
      if (index !== -1) {
        const _staff = _data[index];
        setMongoID(_staff._id);
        setFormData({
          name: _staff.name,
          about: _staff.about,
          email: _staff.email,
          mobile: _staff.mobile,
          gender: _staff.gender,
          age: _staff.age,
          nationality: _staff.nationality,
        });
        setImagePath(_staff.image);
      }
    }
  }, [dialogId, _data]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    dispatch(closeStaffDialog());
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
    document.getElementById("staffImage").click();
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

    const { age, about, gender, email, mobile, name, nationality } = formData;

    if (gender === "" || email === "" || mobile === "" || name === "") {
      const _errors = {
        image: "",
        name: "",
        email: "",
        mobile: "",
        gender: "",
      };
      if (gender === "") _errors.gender = "Invalid value!";
      if (email === "") _errors.email = "Invalid value!";
      if (mobile === "") _errors.mobile = "Invalid value!";
      if (name === "") _errors.name = "Invalid value!";
      return setErrors(_errors);
    }

    const _formData = new FormData();
    if (imageData) _formData.append("image", imageData);
    _formData.append("name", name || "");
    _formData.append("mobile", mobile || "");
    _formData.append("email", email || "");
    _formData.append("gender", gender || "");
    _formData.append("age", age || "");
    _formData.append("nationality", nationality || "");
    _formData.append("about", about || "");

    if (dialogId && mongoID) {
      // Update
      const data = await networkRequest(
        `/staff/${mongoID}`,
        "patch",
        _formData
      );
      dispatch(updateStaff({ data: data.data.staff, id: mongoID }));
      handleClose();
    } else {
      // Create
      const data = await networkRequest("/staff", "post", _formData);
      console.log(data);
      dispatch(addNewStaff(data.data.staff));
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
        <Typography variant="h3">Staff Details</Typography>
      </DialogTitle>
      <MuiDialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div onClick={handleEditImage}>
                <input
                  name="staffImage"
                  id="staffImage"
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
            <Grid item xs={12} sm={6}>
              <div className={classes.textField}>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  label="Name"
                  pattern="^\w+(\s+\w+)*$"
                  fullWidth
                  required
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  label="Email"
                  type="email"
                  fullWidth
                  required
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  error={errors.mobile ? true : false}
                  helperText={errors.mobile}
                  label="Mobile"
                  fullWidth
                  required
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  error={errors.nationality ? true : false}
                  helperText={errors.nationality}
                  label="Nationality"
                  fullWidth
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={errors.age ? true : false}
                  helperText={errors.age}
                  label="Age"
                  type="number"
                  fullWidth
                />
              </div>
              <div className={classes.textField}>
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    error={errors.gender ? true : false}
                    helperText={errors.gender}
                    required
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={classes.genderContainer}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <Grid item sm={12}>
              <TextField
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                error={errors.about ? true : false}
                helperText={errors.about}
                label="About"
                pattern="^\w+(\s+\w+)*$"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={12} className={classes.submitButton}>
              <Button variant="contained" color="primary" type="submit">
                {!mongoID ? "Submit" : "Update"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </MuiDialogContent>
    </MuiDialog>
  );
};

export default Dialog;
