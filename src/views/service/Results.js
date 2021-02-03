import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Axios from "axios";

// redux
import { useDispatch } from "react-redux";
import { deleteService, openServiceDialog } from "../../redux/service/actions";

// Mui
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
  makeStyles,
  Tooltip,
  Button,
} from "@material-ui/core";

// icons
import EditIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";

// util
import setEmptyStr from "../../utils/setEmptyStr";
import trimStr from "../../utils/trimStr";
import setDate from "../../utils/setDate";
import { warning, alert } from "../../utils/alert";

// components
import Image from "../../components/Image";
import ToolTipButton from "../../components/ToolTipButton";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, services, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedServiceIds;

    if (event.target.checked) {
      newSelectedServiceIds = services.map((service) => service._id);
    } else {
      newSelectedServiceIds = [];
    }

    setSelectedServiceIds(newSelectedServiceIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedServiceIds.indexOf(id);
    let newSelectedServiceIds = [];

    if (selectedIndex === -1) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(1)
      );
    } else if (selectedIndex === selectedServiceIds.length - 1) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(0, selectedIndex),
        selectedServiceIds.slice(selectedIndex + 1)
      );
    }

    setSelectedServiceIds(newSelectedServiceIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenServiceDialog = (id) => {
    dispatch(openServiceDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await Axios.delete(`/service/${id}`);
            if (data.status === 200) {
              dispatch(deleteService(id));
              alert("Deleted!", "Service has been deleted!", "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedServiceIds.length === services.length}
                    color="primary"
                    indeterminate={
                      selectedServiceIds.length > 0 &&
                      selectedServiceIds.length < services.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(limit > 0
                ? services.slice(page * limit, page * limit + limit)
                : services
              ).map((service) => (
                <TableRow
                  hover
                  key={service._id}
                  selected={selectedServiceIds.indexOf(service._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedServiceIds.indexOf(service._id) !== -1}
                      onChange={(event) => handleSelectOne(event, service._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Image image={service.image} />
                  </TableCell>
                  <TableCell>{setEmptyStr(service.title)}</TableCell>
                  <TableCell>
                    <Tooltip title={setEmptyStr(service.description)}>
                      <Button
                        className={classes.description}
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        variant="text"
                      >
                        {trimStr(setEmptyStr(service.description))}
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{setEmptyStr(service.price)}</TableCell>
                  <TableCell>{setDate(service.createdAt)}</TableCell>
                  <TableCell>
                    <ToolTipButton
                      onClick={() => handleOpenServiceDialog(service._id)}
                      title="Edit"
                    >
                      <EditIcon color="primary" />
                    </ToolTipButton>
                    <ToolTipButton
                      title="Delete"
                      onClick={() => handleDelete(service._id)}
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
        count={services.length}
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
  services: PropTypes.array.isRequired,
};

export default Results;
