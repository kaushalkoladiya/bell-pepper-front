import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RichTextEditor from "react-rte";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addNewService, updateService } from "../../../redux/service/actions";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Grid, Typography } from "@material-ui/core";

// components
import Image from "../../../components/Image";
import ToolTipButton from "../../../components/ToolTipButton";

// icon
import EditIcon from "@material-ui/icons/EditRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

// utile
import { networkRequest } from "../../../utils";
import CategoryDropdown from "../../Category/CategoryDropdown";
import Page from "../../../components/Page";
import ErrorMessage from "../../../components/ErrorMessage";
import TableToolbar from "../../../components/TableToolbar";
import RichTextBox from "../../../components/RichTextBox";

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
    margin: "20px 0",
  },
  leftContainer: {
    marginTop: 20,
    alignItem: "center",
  },
  bottomSection: {
    marginTop: 20,
  },
  textField: {
    marginBottom: 10,
  },
  largeTextField: {
    margin: "10px 0",
  },
  cancelButton: {
    marginRight: 10,
  },
  richTextArea: {
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    background: theme.palette.grey[200],
  },
}));

const TitleWithCharCount = ({ title, count }) => {
  const classes = useStyles();
  return (
    <div className={classes.largeTextField}>
      <Typography variant="h5" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Only {450 - count} character remains.
      </Typography>
    </div>
  );
};

const Laundry = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const serviceId = params.serviceId;
  const [richTextEditors, setRichTextEditors] = useState({
    description: RichTextEditor.createEmptyValue(),
    packageInclude: RichTextEditor.createEmptyValue(),
    brandUsed: RichTextEditor.createEmptyValue(),
    suitable: RichTextEditor.createEmptyValue(),
    certification: RichTextEditor.createEmptyValue(),
  });
  const [formData, setFormData] = useState({
    mongoID: null,
    categoryId: null,
    title: "",
    description: "",
    price: "",
    discount: "",
    packageInclude: "",
    brandUsed: "",
    suitable: "",
    certification: "",
  });

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [insertType, setInsertType] = useState("");

  const [errors, setErrors] = useState({
    mongoID: null,
    categoryId: null,
    title: "",
    description: "",
    price: "",
    discount: "",
    packageInclude: "",
    brandUsed: "",
    suitable: "",
    certification: "",
  });

  const _data = useSelector((state) => state.service.data);

  useEffect(() => {
    return () => {
      setErrors({
        mongoID: null,
        categoryId: null,
        title: "",
        description: "",
        price: "",
        discount: "",
        packageInclude: "",
        brandUsed: "",
        suitable: "",
        certification: "",
      });
      setFormData({
        mongoID: null,
        categoryId: null,
        title: "",
        description: "",
        price: "",
        discount: "",
        packageInclude: "",
        brandUsed: "",
        suitable: "",
        certification: "",
      });
      setRichTextEditors({
        description: RichTextEditor.createEmptyValue(),
        packageInclude: RichTextEditor.createEmptyValue(),
        brandUsed: RichTextEditor.createEmptyValue(),
        suitable: RichTextEditor.createEmptyValue(),
        certification: RichTextEditor.createEmptyValue(),
      });
    };
  }, [serviceId]);

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
          packageInclude: _service.packageInclude,
          brandUsed: _service.brandUsed,
          suitable: _service.suitable,
          certification: _service.certification,
        });

        const createRTEValue = (value) =>
          RichTextEditor.createValueFromString(value, "html");

        setRichTextEditors({
          description: createRTEValue(_service.description),
          packageInclude: createRTEValue(_service.packageInclude),
          brandUsed: createRTEValue(_service.brandUsed),
          suitable: createRTEValue(_service.suitable),
          certification: createRTEValue(_service.certification),
        });

        setImagePath(_service.image);
        setCoverImages(_service.coverImage);
      }
    }
  }, [serviceId, _data]);

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

  const handleEditImage = () =>
    document.getElementById("laundry-serviceImage").click();

  const handleInputChange = (e) =>
    handleChangeFormData(e.target.name, e.target.value);

  const handleChangeFormData = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleCategoryChange = (e) =>
    handleChangeFormData("categoryId", e.target.value);

  const handleErrorChange = (name, value) =>
    setErrors({
      ...errors,
      [name]: value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.mongoID) {
      if (!imageData && !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    } else if (!formData.mongoID) {
      if (!imageData || !imagePath)
        return setErrors({ ...errors, image: "Please select an image." });
    }

    const _formData = new FormData();
    if (imageData) _formData.append("image", imageData);
    _formData.append("categoryId", formData.categoryId);
    _formData.append("title", formData.title);
    _formData.append("description", formData.description);
    _formData.append("price", formData.price);
    _formData.append("discount", formData.discount);
    _formData.append("packageInclude", formData.packageInclude);
    _formData.append("brandUsed", formData.brandUsed);
    _formData.append("suitable", formData.suitable);
    _formData.append("certification", formData.certification);

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

  let fields = [];

  if (insertType === "cleaning") {
    fields = [
      {
        funcArg: "certification",
        placeholder: "Certification",
        title: "Certification",
      },
    ];
  }

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
          <Grid container className={classes.leftContainer} spacing={2}>
            <Grid item sm={12} md={8}>
              <input
                name="laundry-serviceImage"
                id="laundry-serviceImage"
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

              {/* <TextField
                className={classes.textField}
                value={formData.price}
                name="price"
                onChange={handleInputChange}
                error={errors.price ? true : false}
                helperText={errors.price}
                label="Price"
                type="number"
                fullWidth
              /> */}

              {/* <TextField
                className={classes.textField}
                value={formData.discount}
                name="discount"
                onChange={handleInputChange}
                error={errors.discount ? true : false}
                helperText={errors.discount}
                label="Discount"
                type="number"
                fullWidth
              /> */}

              <CategoryDropdown
                category={formData.categoryId}
                onChange={handleCategoryChange}
                error={errors.categoryId}
              />

              <RichTextBox
                title={"Description"}
                placeholder={"Item description"}
                onTextChange={handleChangeFormData}
                funcArg={"description"}
              />

              {fields.map((item, key) => (
                <RichTextBox
                  key={key}
                  title={item.title}
                  placeholder={item.placeholder}
                  onTextChange={handleChangeFormData}
                  funcArg={item.funcArg}
                />
              ))}
            </Grid>
            <Grid item sm={12} md={4}>
              {formData.mongoID && (
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                  {coverImages.map((item, key) => (
                    <Grid item md={6} sm={12} key={key}>
                      <img
                        alt="cover slide"
                        src={item}
                        style={{
                          borderRadius: 10,
                          width: "100%",
                          height: "100%",
                        }}
                      />
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

export default Laundry;
