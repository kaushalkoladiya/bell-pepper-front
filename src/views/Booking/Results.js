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
  Tooltip,
  makeStyles,
  Button,
  Chip as MuiChip,
  Avatar,
  colors,
} from "@material-ui/core";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";

import setEmptyStr from "../../utils/setEmptyStr";
import trimStr from "../../utils/trimStr";
import {
  openBookingDialog,
  openStaffDialog,
} from "../../redux/booking/actions";
import ToolTipButton from "../../components/ToolTipButton";
import { warning } from "../../utils/alert";
import Chip from "../../components/Chip";
import getInitials from "../../utils/getInitials";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  description: {
    margin: theme.spacing(1),
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

  const handleOpenStaffAssignDialog = (bookingId, vendorId) => {
    dispatch(openStaffDialog({ bookingId, vendorId }));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          // delete
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
                    checked={selectedBookingIds.length === bookings.length}
                    color="primary"
                    indeterminate={
                      selectedBookingIds.length > 0 &&
                      selectedBookingIds.length < bookings.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Service Title</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Professions</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Profession</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(limit > 0
                ? bookings.slice(page * limit, page * limit + limit)
                : bookings
              ).map((booking) => (
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
                  <TableCell>{setEmptyStr(booking?.userId?.name)}</TableCell>
                  <TableCell>
                    <Tooltip title={setEmptyStr(booking.description)}>
                      <Button
                        className={classes.description}
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        variant="text"
                      >
                        {trimStr(setEmptyStr(booking.description))}
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {booking.isMaterialRequired ? "on" : "off"}
                  </TableCell>
                  <TableCell>{setEmptyStr(booking.frequency)}</TableCell>
                  <TableCell>{setEmptyStr(booking.howManyHours)}</TableCell>
                  <TableCell>
                    {setEmptyStr(booking.howManyProfessions)}
                  </TableCell>
                  <TableCell>{trimStr(booking.date)}</TableCell>
                  <TableCell>{trimStr(booking.time)}</TableCell>
                  <TableCell>
                    {!booking.profession && !booking.isCancelled && (
                      <ToolTipButton
                        onClick={() =>
                          handleOpenStaffAssignDialog(
                            booking._id,
                            booking.vendorId._id
                          )
                        }
                        title="Assign Employee"
                        placement="top"
                      >
                        <AssignmentIcon color="action" fontSize="small" />
                      </ToolTipButton>
                    )}
                    {booking.profession && !booking.isCancelled && (
                      <MuiChip
                        label={booking.profession.name}
                        size="small"
                        style={{
                          backgroundColor:
                            booking.profession &&
                            booking.isDone &&
                            colors.green[500],
                          color:
                            booking.profession &&
                            booking.isDone &&
                            colors.common.white,
                        }}
                        icon={<Avatar />}
                      />
                    )}
                    {booking.isCancelled && booking.cancelledByWhom && (
                      <Chip type="cancel" label={booking.cancelledByWhom} />
                    )}
                    {booking.profession && booking.isDone && (
                      <Chip type="success" />
                    )}
                    {booking.profession && !booking.isDone && (
                      <Chip type="success" label="Assigned" />
                    )}
                  </TableCell>

                  <TableCell>
                    <ToolTipButton
                      onClick={() => handleOpenBookingDialog(booking._id)}
                      title="Edit"
                      placement="top"
                    >
                      <VisibilityIcon color="primary" fontSize="small" />
                    </ToolTipButton>
                    <ToolTipButton
                      onClick={handleDelete}
                      title="Delete"
                      placement="top"
                    >
                      <DeleteIcon color="error" fontSize="small" />
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
