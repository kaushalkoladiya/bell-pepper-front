import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Axios from "axios";

// redux
import { useDispatch } from "react-redux";
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
} from "@material-ui/core";

// icons
import DeleteIcon from "@material-ui/icons/DeleteRounded";
// utils
import setEmptyStr from "../../utils/setEmptyStr";
import setDate from "../../utils/setDate";
import { warning, alert } from "../../utils/alert";
// components

import ToolTipButton from "../../components/ToolTipButton";
import { deleteVendor } from "../../redux/vendor/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, vendors, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedVendorIds, setSelectedVendorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedVendorIds;

    if (event.target.checked) {
      newSelectedVendorIds = vendors.map((vendor) => vendor._id);
    } else {
      newSelectedVendorIds = [];
    }

    setSelectedVendorIds(newSelectedVendorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedVendorIds.indexOf(id);
    let newSelectedVendorIds = [];

    if (selectedIndex === -1) {
      newSelectedVendorIds = newSelectedVendorIds.concat(selectedVendorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedVendorIds = newSelectedVendorIds.concat(
        selectedVendorIds.slice(1)
      );
    } else if (selectedIndex === selectedVendorIds.length - 1) {
      newSelectedVendorIds = newSelectedVendorIds.concat(
        selectedVendorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedVendorIds = newSelectedVendorIds.concat(
        selectedVendorIds.slice(0, selectedIndex),
        selectedVendorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedVendorIds(newSelectedVendorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    const data = warning(
      "Make sure all the related booking and staff will be\n deleted automatically!"
    );
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await Axios.delete(`/vendor/${id}`);
            if (data.status === 200) {
              dispatch(deleteVendor(id));
              alert("Deleted!", "Vendor has been deleted!", "success");
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
                    checked={selectedVendorIds.length === vendors.length}
                    color="primary"
                    indeterminate={
                      selectedVendorIds.length > 0 &&
                      selectedVendorIds.length < vendors.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                {/* <TableCell>Staff</TableCell> */}
                <TableCell>Joined On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.slice(0, limit).map((vendor) => (
                <TableRow
                  hover
                  key={vendor._id}
                  selected={selectedVendorIds.indexOf(vendor._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVendorIds.indexOf(vendor._id) !== -1}
                      onChange={(event) => handleSelectOne(event, vendor._id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{setEmptyStr(vendor.companyName)}</TableCell>
                  <TableCell>{setEmptyStr(vendor.mobile)}</TableCell>
                  <TableCell>{`${vendor.address.houseNumber}, ${vendor.address.street} ${vendor.address.city}`}</TableCell>
                  <TableCell>{setDate(vendor.createdAt)}</TableCell>
                  <TableCell>
                    <ToolTipButton
                      title="Delete"
                      onClick={() => handleDelete(vendor._id)}
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
        count={vendors.length}
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
  vendors: PropTypes.array.isRequired,
};

export default Results;
