import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
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
  makeStyles,
} from "@material-ui/core";
import getInitials from "../../utils/getInitials";
import setEmptyStr from "../../utils/setEmptyStr";
import ProfileName from "../../components/ProfileName";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, vendors, ...rest }) => {
  const classes = useStyles();
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
                <TableCell>Staff</TableCell>
                <TableCell>Registration date</TableCell>
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
                  <TableCell>
                    <ProfileName name={vendor.companyName} />
                  </TableCell>
                  <TableCell>{setEmptyStr(vendor.mobile)}</TableCell>
                  <TableCell>{setEmptyStr(vendor.address)}</TableCell>
                  <TableCell>{setEmptyStr(vendor.city)}</TableCell>
                  <TableCell>
                    {moment(vendor.createdAt).format("DD/MM/YYYY")}
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
