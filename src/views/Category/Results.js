import React, { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import dayjs from "dayjs";

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

// Redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  deleteCategory,
  toggleFestival,
} from "../../redux/actions/categoryAction";
import { OPEN_CATEGORY_DIALOG } from "../../redux/types";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// theme
import useCustomMuiStyle from "../../theme/custom";

// util
import trimstr from "../../utils/trimstr";

// Components
import ToolTipButton from "../../components/ToolTipButton";
import IOSSwitch from "../../components/IOSSwitch";
import serverPath from "../../utils/serverPath";
import { permissionError, warning } from "../../utils/alert";

const Results = ({
  className,
  categories,
  deleteCategory,
  toggleFestival,
  ...rest
}) => {
  const classes = useCustomMuiStyle();
  const dispatch = useDispatch();

  const hasPermission = useSelector((state) => state.admin.data.flag);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (id) => {
    if (!hasPermission) return permissionError();

    dispatch({ type: OPEN_CATEGORY_DIALOG, payload: id });
  };

  const handleDelete = (id) => {
    if (!hasPermission) return permissionError();

    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          deleteCategory(id);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggleFestival = (id) => {
    if (!hasPermission) return permissionError();

    toggleFestival(id);
  };

  return (
    <Card className={className} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Favorite</TableCell>
                <TableCell>Created date</TableCell>
                <TableCell>Updated date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * limit, page * limit + limit)
                .map((row, key) => (
                  <TableRow hover key={key}>
                    <TableCell>
                      <img
                        className={classes.tableImage}
                        src={`${serverPath}/${row.image}`}
                        alt={row.title}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {trimstr(row.title)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {trimstr(row.description)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IOSSwitch
                        onChange={() => handleToggleFestival(row._id)}
                        checked={row.isFestival}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {dayjs(row.createdAt).format("DD MMM, YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {dayjs(row.updatedAt).format("DD MMM, YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <ToolTipButton
                        title="Edit"
                        placement="top"
                        onClick={() => handleEdit(row._id)}
                      >
                        <EditIcon color="primary" />
                      </ToolTipButton>

                      <ToolTipButton
                        title="Delete"
                        placement="bottom"
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon color="error" />
                      </ToolTipButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={categories.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  toggleFestival: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, toggleFestival })(Results);
