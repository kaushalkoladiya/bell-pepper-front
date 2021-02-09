import React, { useState, useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  openCategoryDialog,
  deleteCategory,
  getCategory,
} from "../../redux/category/actions";
// MUI
import { Box, Container, makeStyles } from "@material-ui/core";
// Components
import Page from "../../components/Page";
import TableToolbar from "../../components/TableToolbar";
import Dialog from "./Dialog";
import ToolTipButton from "../../components/ToolTipButton";
import { setDate } from "../../utils";
import { warning, alert } from "../../utils/alert";
import axios from "axios";
import Image from "../../components/Image";

// icons
import EditIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import EditedChip from "../../components/Chip/Edited";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Category = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { data: categoriesData } = useSelector((state) => state.category);

  useEffect(() => {
    setData(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/category");
        dispatch(getCategory(data.data.categories));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = categoriesData.filter((row) => {
        return row?.name?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      setData(categoriesData);
    }
  };

  const handleOpenDialog = (id = null) => {
    dispatch(openCategoryDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/category/${id}`);
            if (data.status === 200) {
              dispatch(deleteCategory(id));
              alert("Deleted!", "Category has been deleted!", "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Image",
      cell: (row) => (row.hasImage ? <Image image={row.image} /> : "No Image"),
    },
    {
      name: "Title",
      selector: "name",
      sortable: true,
    },
    {
      name: "Created At",
      cell: (row) => setDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <ToolTipButton onClick={() => handleOpenDialog(row._id)} title="Edit">
            <EditIcon color="primary" />
          </ToolTipButton>
          <ToolTipButton title="Delete" onClick={() => handleDelete(row._id)}>
            <DeleteIcon color="error" />
          </ToolTipButton>
          {row.createdAt !== row.updatedAt && <EditedChip />}
        </div>
      ),
    },
  ];

  return (
    <Page className={classes.root} title="Categories">
      <Container maxWidth={false}>
        <TableToolbar title="Category" onAddButtonClick={handleOpenDialog} />
        <Box mt={3}>
          <DataTable
            data={data}
            title="Categories"
            columns={columns}
            actions={<SearchBar title="Category" onSearch={handleSearch} />}
          />
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default Category;
