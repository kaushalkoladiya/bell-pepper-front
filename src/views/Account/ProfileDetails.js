import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import { setAdminData } from "../../redux/admin/actions";
import { alert, underDevelopment } from "../../utils/alert";

const ProfileDetails = ({ className, userData, ...rest }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState({ name: "", email: "" });

  useEffect(() => {
    setFormData({
      name: userData.name,
      email: userData.email,
    });
    return () => {
      setError({ name: "", email: "" });
    };
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    return underDevelopment();

    if (formData.name === "") {
      return setError({ ...error, name: "Name is required!" });
    } else if (formData.email === "") {
      return setError({ ...error, email: "Email is required!" });
    }

    try {
      const { data } = await Axios.patch("/admin", formData);
      dispatch(setAdminData(data.data.admin));
      alert("Done", "Profile updated successfully!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form autoComplete="off" noValidate className={className} {...rest}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your name"
                error={error.name ? true : false}
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your email"
                error={error.email ? true : false}
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={formData.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
