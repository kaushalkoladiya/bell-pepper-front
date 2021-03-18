import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  addNewService,
  clearServiceDetails,
  updateServiceDetails,
  updateService,
} from "../../../redux/service/actions";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Grid, Paper } from "@material-ui/core";

// components
import Image from "../../../components/Image";
import ToolTipButton from "../../../components/ToolTipButton";
import CategoryDropdown from "../../Category/CategoryDropdown";

// icon
import EditIcon from "@material-ui/icons/EditRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import DeleteIcon from "../../../components/Icon/Delete";

// utile
import { networkRequest } from "../../../utils";
import Page from "../../../components/Page";
import ErrorMessage from "../../../components/ErrorMessage";
import TableToolbar from "../../../components/TableToolbar";
import RichTextBox from "../../../components/RichTextBox";
import Cleaning from "./Cleaning";
import Detail from "./Detail";

const useStyles = makeStyles(() => ({
  imageContainer: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },
  textCenter: {
    textAlign: "center",
    padding: 5,
  },
  submitButton: {
    textAlign: "right",
    margin: "20px 0",
  },
  formContainer: {
    marginTop: 20,
  },
  bottomSection: {
    marginTop: 20,
  },
  largeTextField: {
    margin: "10px 0",
  },
  cancelButton: {
    marginRight: 10,
  },
  categoryDropdown: {
    marginLeft: 30,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    margin: "10px 0",
    padding: 10,
  },
  containerItems: {
    marginTop: 10,
    display: "flex",
  },
  textField: {
    margin: "0 5px 5px 5px",
  },
  coverImageContainer: {
    position: "relative",
  },
  coverImageIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
}));

const CreateOrEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const serviceId = params.serviceId;

  const [formData, setFormData] = useState({
    mongoID: null,
    categoryId: "",
    title: "",
    description: "",
    price: 0,
    discount: 0,
  });

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [coverImages, setCoverImages] = useState([]);

  const [errors, setErrors] = useState({
    mongoID: null,
    categoryId: "",
    title: "",
    description: "",
    price: "",
    discount: "",
  });

  const _data = useSelector((state) => state.service.data);
  const state = useSelector((state) => state.service.cleaning);

  useEffect(() => {
    return () => {
      setErrors({
        mongoID: null,
        categoryId: "",
        title: "",
        description: "",
        price: 0,
        discount: 0,
      });
      setFormData({
        mongoID: null,
        categoryId: "",
        title: "",
        description: "",
        price: "",
        discount: "",
      });
      setImageData("");
      setImagePath("");
      setCoverImages([]);
      dispatch(clearServiceDetails());
    };
  }, [serviceId, dispatch]);

  useEffect(() => {
    if (serviceId !== "create") {
      const index = _data.findIndex((item) => item._id === serviceId);
      if (index !== -1) {
        const _service = _data[index];

        setFormData({
          mongoID: _service._id,
          categoryId: _service.categoryId._id,
          title: _service.title,
          description: _service.description,
          price: _service.price,
          discount: _service.discount,
        });

        dispatch(
          updateServiceDetails({
            data: {
              frequency: _service.frequencies,
              hour: _service.hours,
              staff: _service.staffs,
              detail: _service.details,
            },
            multiple: true,
          })
        );

        setImagePath(_service.image);
        setCoverImages(_service.coverImage);
      }
    }
  }, [serviceId, _data, dispatch]);

  const clearErrors = () =>
    setErrors({
      mongoID: null,
      categoryId: "",
      title: "",
      description: "",
      price: "",
      discount: "",
    });

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

  const handleEditImage = () => document.getElementById("serviceImage").click();

  const handleInputChange = (e) =>
    handleChangeFormData(e.target.name, e.target.value);

  const handleChangeFormData = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleCategoryChange = (e) =>
    handleChangeFormData("categoryId", e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();

    if (formData.mongoID) {
      if (!imageData && !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    } else if (!formData.mongoID) {
      if (!imageData || !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    }

    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.categoryId === ""
    ) {
      const _errors = {};
      if (formData.title === "") _errors.title = "Invalid title!";
      if (formData.description === "")
        _errors.description = "Invalid description!";
      if (formData.categoryId === "")
        _errors.categoryId = "Invalid Main Service!";

      return setErrors({ ...errors, ..._errors });
    }

    const _formData = new FormData();

    if (imageData) _formData.append("image", imageData);

    _formData.append("categoryId", formData.categoryId);
    _formData.append("title", formData.title);
    _formData.append("description", formData.description);
    _formData.append("price", formData.price);
    _formData.append("discount", formData.discount);
    _formData.append("frequencies", JSON.stringify(state.frequency));
    _formData.append("hours", JSON.stringify(state.hour));
    _formData.append("staffs", JSON.stringify(state.staff));
    _formData.append("details", JSON.stringify(state.detail));

    if (formData.mongoID) {
      // Update
      const data = await networkRequest(
        `/service/${formData.mongoID}`,
        "patch",
        _formData
      );
      if (data)
        dispatch(
          updateService({ data: data.data.service, id: formData.mongoID })
        );
    } else {
      // Create
      const data = await networkRequest("/service", "post", _formData);
      if (data) dispatch(addNewService(data.data.service));
    }
    handleCancel();
  };

  const handleCancel = () => navigate("/admin/services");

  const handleDeleteCoverImage = async (index) => {
    try {
      const data = await networkRequest(
        `/service/coverImage/${formData.mongoID}/index/${index}`,
        "put"
      );
      console.log(data);
      if (data)
        dispatch(
          updateService({ data: data.data.service, id: formData.mongoID })
        );
    } catch (error) {
      console.log(error);
    }
  };

  const smallTextFields = [
    {
      funcArg: "price",
      placeholder: "Service Price",
      title: "Service Price",
    },
    {
      funcArg: "discount",
      placeholder: "Discount on final price?",
      title: "Discount on final price?",
    },
  ];

  let restFields = <Detail />;

  if (formData.categoryId === "6034864cc539ac08fd7c90e1")
    restFields = <Cleaning />;

  return (
    <Page className={classes.root} title="Create New Sub Service">
      <Container maxWidth={false}>
        <TableToolbar
          hideAddButton
          component={
            <div>
              <ToolTipButton title="Back" onClick={handleCancel}>
                <BackIcon />
              </ToolTipButton>
            </div>
          }
          backTitle={
            formData.mongoID ? "Update Sub Service" : "Create New Sub Service"
          }
        />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.formContainer}>
            <Grid item sm={12} md={8}>
              <input
                name="serviceImage"
                id="serviceImage"
                type="file"
                hidden
                accept="image/*"
                onChange={handleInputFileChange}
              />
              <Image extraLarge image={imagePath} />
              <ToolTipButton onClick={handleEditImage} title="Choose Image">
                <EditIcon color="primary" />
              </ToolTipButton>
              <ErrorMessage error={errors.image} />

              <div className={classes.titleContainer}>
                <TextField
                  className={classes.textField}
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                  label="Title"
                  pattern="^\w+(\s+\w+)*$"
                  fullWidth
                />
                <div className={classes.categoryDropdown}>
                  <CategoryDropdown
                    category={formData.categoryId}
                    onChange={handleCategoryChange}
                    error={errors.categoryId}
                  />
                </div>
              </div>

              <Paper className={classes.container}>
                <div className={classes.containerItems}>
                  {smallTextFields.map((item, key) => (
                    <TextField
                      key={key}
                      name={item.funcArg}
                      value={formData[item.funcArg]}
                      label={item.title}
                      placeholder={item.placeholder}
                      className={classes.textField}
                      onChange={handleInputChange}
                      type="number"
                      fullWidth
                    />
                  ))}
                </div>
              </Paper>

              <RichTextBox
                title={"Description"}
                placeholder={"Item description"}
                onTextChange={handleChangeFormData}
                funcArg={"description"}
                error={errors.description}
                value={formData.description}
              />

              {restFields}
            </Grid>
            <Grid item sm={12} md={4}>
              {formData.mongoID && (
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                  {coverImages.map((item, key) => (
                    <Grid
                      item
                      md={6}
                      sm={12}
                      key={key}
                      className={classes.coverImageContainer}
                    >
                      <img
                        alt="cover slide"
                        src={item}
                        style={{
                          borderRadius: 10,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <ToolTipButton
                        title="Delete Image"
                        onClick={() => handleDeleteCoverImage(key)}
                        btnClass={classes.coverImageIcon}
                      >
                        <DeleteIcon />
                      </ToolTipButton>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item sm={8} className={classes.submitButton}>
            <Button
              variant="contained"
              className={classes.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {!formData.mongoID ? "Submit" : "Update"}
            </Button>
          </Grid>
        </form>
      </Container>
    </Page>
  );
};

export default CreateOrEdit;
