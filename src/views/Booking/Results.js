import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
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
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import setEmptyStr from "../../utils/setEmptyStr";

import trimStr from "../../utils/trimStr";

import { openBookingDialog } from "../../redux/booking/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, bookings, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedBookingIds, setSelectedBookingIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedBookingIds;

    if (event.target.checked) {
      newSelectedBookingIds = bookings.map((booking) => booking._id);
    } else {
      newSelectedBookingIds = [];
    }

    setSelectedBookingIds(newSelectedBookingIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBookingIds.indexOf(id);
    let newSelectedBookingIds = [];

    if (selectedIndex === -1) {
      newSelectedBookingIds = newSelectedBookingIds.concat(
        selectedBookingIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedBookingIds = newSelectedBookingIds.concat(
        selectedBookingIds.slice(1)
      );
    } else if (selectedIndex === selectedBookingIds.length - 1) {
      newSelectedBookingIds = newSelectedBookingIds.concat(
        selectedBookingIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBookingIds = newSelectedBookingIds.concat(
        selectedBookingIds.slice(0, selectedIndex),
        selectedBookingIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBookingIds(newSelectedBookingIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenBookingDialog = (id) => {
    dispatch(openBookingDialog(id));
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
                    checked={selectedBookingIds.length === bookings.length}
                    color="primary"
                    indeterminate={
                      selectedBookingIds.length > 0 &&
                      selectedBookingIds.length < bookings.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Vendor's Company Name</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Profession</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Time Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.slice(0, limit).map((booking) => (
                <TableRow
                  hover
                  key={booking._id}
                  selected={selectedBookingIds.indexOf(booking._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBookingIds.indexOf(booking._id) !== -1}
                      onChange={(event) => handleSelectOne(event, booking._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{booking.vendorId.companyName}</TableCell>
                  <TableCell>{booking.serviceId.title}</TableCell>
                  <TableCell>{setEmptyStr(booking.userId.name)}</TableCell>
                  <TableCell>
                    {trimStr(setEmptyStr(booking.description))}
                  </TableCell>
                  <TableCell>
                    {booking.isMaterialRequired ? "on" : "off"}
                  </TableCell>
                  <TableCell>{setEmptyStr(booking.frequency)}</TableCell>
                  <TableCell>{setEmptyStr(booking.howManyHours)}</TableCell>
                  <TableCell>
                    {setEmptyStr(booking.howManyProfessions)}
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenBookingDialog(booking._id)}
                    >
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={bookings.length}
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
  bookings: PropTypes.array.isRequired,
};

export default Results;
