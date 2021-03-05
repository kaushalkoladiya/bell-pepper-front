import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RichTextEditor from "react-rte";
import h2p from "html2plaintext";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addNewService, updateService } from "../../redux/service/actions";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Grid, Typography } from "@material-ui/core";

// components
import Image from "../../components/Image";
import ToolTipButton from "../../components/ToolTipButton";

// icon
import EditIcon from "@material-ui/icons/EditRounded";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

// utile
import { networkRequest } from "../../utils";
import CategoryDropdown from "../Category/CategoryDropdown";
import Page from "../../components/Page";
import ErrorMessage from "../../components/ErrorMessage";
import TableToolbar from "../../components/TableToolbar";

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

const CreateNew = () => {
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

  const [charLength, setCharLength] = useState({
    description: "",
    packageInclude: "",
    brandUsed: "",
    suitable: "",
    certification: "",
  });
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
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

        setRichTextEditors({
          description: RichTextEditor.createValueFromString(
            _service.description,
            "html"
          ),
          packageInclude: RichTextEditor.createValueFromString(
            _service.packageInclude,
            "html"
          ),
          brandUsed: RichTextEditor.createValueFromString(
            _service.brandUsed,
            "html"
          ),
          suitable: RichTextEditor.createValueFromString(
            _service.suitable,
            "html"
          ),
          certification: RichTextEditor.createValueFromString(
            _service.certification,
            "html"
          ),
        });

        setImagePath(_service.image);
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

  const handleEditImage = () => {
    document.getElementById("serviceImage").click();
  };

  const handleInputChange = (e) =>
    handleChangeFormData(e.target.name, e.target.value);

  const handleChangeFormData = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleCategoryChange = (e) =>
    handleChangeFormData("categoryId", e.target.value);

  const handleCharLengthChange = (name, value) =>
    setCharLength({ ...charLength, [name]: value });

  const handleRTChange = (e, name) => {
    handleChangeFormData(name, e.toString("html"));
    setRichTextEditors({ ...richTextEditors, [name]: e });
    const length = h2p(e.toString("html")).length;
    handleCharLengthChange(name, length);
    if (length > 450) {
      return handleErrorChange(name, "Text is too long!");
    } else {
      return handleErrorChange(name, "");
    }
  };

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

  return (
    <Page className={classes.root} title="Create New Sub Service">
      <Container maxWidth={false}>
        <TableToolbar
          hideAddButton
          component={
            <ToolTipButton title="Back" onClick={handleCancel}>
              <BackIcon />
            </ToolTipButton>
          }
          backTitle={
            formData.mongoID ? "Update Sub Service" : "Create New Sub Service"
          }
        />
        <Grid container spacing={3}>
          <Grid item sm={12} className={classes.topSection}></Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container className={classes.leftContainer} spacing={2}>
            <Grid item sm={12} md={6}>
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

              <TextField
                className={classes.textField}
                value={formData.price}
                name="price"
                onChange={handleInputChange}
                error={errors.price ? true : false}
                helperText={errors.price}
                label="Price"
                type="number"
                fullWidth
              />

              <TextField
                className={classes.textField}
                value={formData.discount}
                name="discount"
                onChange={handleInputChange}
                error={errors.discount ? true : false}
                helperText={errors.discount}
                label="Discount"
                type="number"
                fullWidth
              />

              <CategoryDropdown
                category={formData.categoryId}
                onChange={handleCategoryChange}
                error={errors.categoryId}
              />

              <div className={classes.textField}>
                <TitleWithCharCount
                  title={"Certification?"}
                  count={charLength.certification}
                />

                <RichTextEditor
                  value={richTextEditors.certification}
                  editorStyle={{
                    border: errors.certification ? "2px solid red" : "none",
                  }}
                  onChange={(e) => handleRTChange(e, "certification")}
                  placeholder="Description"
                />
                <ErrorMessage error={errors.certification} />
              </div>
            </Grid>

            <Grid item sm={12} md={6}>
              <div className={classes.textField}>
                <TitleWithCharCount
                  title={"Description"}
                  count={charLength.description}
                />
                <RichTextEditor
                  value={richTextEditors.description}
                  editorStyle={{
                    border: errors.description ? "2px solid red" : "none",
                  }}
                  onChange={(e) => handleRTChange(e, "description")}
                  placeholder="Description"
                />
                <ErrorMessage error={errors.description} />
              </div>

              <div className={classes.textField}>
                <TitleWithCharCount
                  title={"What the package should Include"}
                  count={charLength.packageInclude}
                />

                <RichTextEditor
                  value={richTextEditors.packageInclude}
                  editorStyle={{
                    border: errors.packageInclude ? "2px solid red" : "none",
                  }}
                  onChange={(e) => handleRTChange(e, "packageInclude")}
                  placeholder="Description"
                />
                <ErrorMessage error={errors.packageInclude} />
              </div>

              <div className={classes.textField}>
                <TitleWithCharCount
                  title={"What brand will be use in it?"}
                  count={charLength.brandUsed}
                />

                <RichTextEditor
                  value={richTextEditors.brandUsed}
                  editorStyle={{
                    border: errors.brandUsed ? "2px solid red" : "none",
                  }}
                  onChange={(e) => handleRTChange(e, "brandUsed")}
                  placeholder="Description"
                />
                <ErrorMessage error={errors.brandUsed} />
              </div>

              <div className={classes.textField}>
                <TitleWithCharCount
                  title={"Suitability?"}
                  count={charLength.suitable}
                />

                <RichTextEditor
                  value={richTextEditors.suitable}
                  editorStyle={{
                    border: errors.suitable ? "2px solid red" : "none",
                  }}
                  onChange={(e) => handleRTChange(e, "suitable")}
                  placeholder="Description"
                />
                <ErrorMessage error={errors.suitable} />
              </div>
            </Grid>
          </Grid>
          <Grid item sm={12} className={classes.submitButton}>
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

export default CreateNew;
