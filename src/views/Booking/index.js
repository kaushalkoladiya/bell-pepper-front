import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  colors,
  Container,
  makeStyles,
  Chip as MuiChip,
  Typography,
} from "@material-ui/core";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { DeleteIcon } from "../../components/Icon";

import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";

import Page from "../../components/Page";

import TableToolbar from "../../components/TableToolbar";
import {
  deleteBooking,
  getBooking,
  openBookingDialog,
  openStaffDialog,
  openVendorDialog,
} from "../../redux/booking/actions";
import Dialog from "./Dialog";
import StaffDialog from "../Staff/StaffDialog";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Chip from "../../components/Chip";
import ToolTipButton from "../../components/ToolTipButton";
import { warning, alert } from "../../utils/alert";
import VendorDialogDropdown from "../Vendor/Dropdown";
import CancelIcon from "@material-ui/icons/CancelRounded";
import DoneIcon from "@material-ui/icons/DoneRounded";
import { ROOT_USER } from "../../constants";
import ShortString from "../../components/ShortString";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  instructionContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  instructionItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: 5,
    backgroundColor: "#f1f1f1",
    padding: "5px 10px",
    borderRadius: 10,
  },
}));

const CancelChip = ({ label }) => (
  <Chip
    type="cancel"
    label={label}
    color={colors.red[500]}
    icon={
      <CancelIcon fontSize="small" style={{ color: colors.common.white }} />
    }
  />
);

const AssignedChip = () => (
  <Chip
    icon={<DoneIcon fontSize="small" style={{ color: colors.common.white }} />}
    label="Assigned"
    color={colors.orange[500]}
  />
);

const StaffSuccessChip = ({ label }) => (
  <MuiChip
    label={label}
    size="small"
    style={{
      backgroundColor: colors.green[500],
      color: colors.common.white,
    }}
    icon={<Avatar />}
  />
);

const StaffPendingChip = ({ label }) => (
  <MuiChip
    label={label}
    size="small"
    style={{
      backgroundColor: colors.grey[500],
      color: colors.common.white,
    }}
    icon={<Avatar />}
  />
);

const CompletedChip = () => (
  <Chip
    icon={<DoneIcon fontSize="small" style={{ color: colors.common.white }} />}
    label="Completed"
    color={colors.indigo[500]}
  />
);

const AssignedVendor = ({ label }) => (
  <Chip icon={<Avatar />} label={label} color={colors.teal[500]} />
);

const Instructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.instructionContainer}>
      <div className={classes.instructionItem}>
        <Typography>Cancel by someone</Typography>
        <CancelChip label="Admin" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Assigned successfully to staff</Typography>
        <AssignedChip />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Job finished</Typography>
        <CompletedChip />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Who has done the job</Typography>
        <StaffSuccessChip label="Staff Name" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Assigned to whom</Typography>
        <StaffPendingChip label="Staff Name" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Assigned to Vendor</Typography>
        <AssignedVendor label="Vendor Name" />
      </div>
    </div>
  );
};

const BookingList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state.booking.data);
  const userType = useSelector((state) => state.admin.userType);

  const isRootUser = userType === ROOT_USER ? true : false;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(bookingData);
  }, [setData, bookingData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/booking");
        dispatch(getBooking(data.data.bookings));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = bookingData.filter((row) => {
        return (
          row?.serviceId?.title?.toUpperCase()?.indexOf(value) > -1 ||
          row?.userId?.name?.toUpperCase()?.indexOf(value) > -1 ||
          row?.description?.toUpperCase()?.indexOf(value) > -1 ||
          row?.howManyHours?.toUpperCase()?.indexOf(value) > -1 ||
          row?.howManyProfessions?.toUpperCase()?.indexOf(value) > -1 ||
          row?.frequency?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(bookingData);
    }
  };

  const handleOpenBookingDialog = (id) => {
    dispatch(openBookingDialog(id));
  };

  const handleOpenAssignDialog = (bookingId, vendorId = null) => {
    if (bookingId && vendorId) {
      //staff
      dispatch(openStaffDialog({ bookingId, vendorId }));
    } else {
      // vendor
      dispatch(openVendorDialog({ bookingId }));
    }
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/booking/${id}`);
            console.log(data);
            if (data.status === 200) {
              dispatch(deleteBooking(id));
              alert("Deleted!", "Booking has been deleted!", "success");
            }
          } catch (error) {
            console.log(error.response);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Service",
      cell: (row) => <ShortString string={row.serviceId.title} />,
      sortable: true,
    },
    {
      name: "User",
      cell: (row) => <ShortString string={row.userId.name} />,
      sortable: true,
    },
    {
      name: "Instruction",
      cell: (row) => <ShortString string={row.description} />,
      sortable: true,
    },
    {
      name: "Material",
      cell: (row) => (row.isMaterialRequired ? "on" : "off"),
      sortable: true,
    },
    {
      name: "Frequency",
      selector: "frequency",
      sortable: true,
    },
    {
      name: "Hours",
      selector: "howManyHours",
      sortable: true,
    },
    {
      name: "Professions",
      selector: "howManyProfessions",
      sortable: true,
    },
    {
      name: "Date & Time",
      cell: (row) => `${row.date} ${row.time}`,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          {row.vendorId && <AssignedVendor label={row.vendorId.companyName} />}
          {!row.isCancelled && (
            <ToolTipButton
              onClick={() =>
                isRootUser
                  ? handleOpenAssignDialog(row._id)
                  : handleOpenAssignDialog(row._id, row.vendorId._id)
              }
              title={isRootUser ? "Assign Vendor" : "Assign Employee"}
              placement="top"
            >
              <AssignmentIcon color="action" fontSize="small" />
            </ToolTipButton>
          )}
          {row.profession && !row.isCancelled && row.isDone && (
            <StaffSuccessChip label={row.profession.name} />
          )}
          {row.profession && !row.isCancelled && !row.isDone && (
            <StaffPendingChip label={row.profession.name} />
          )}
          {row.isCancelled && row.cancelledByWhom && (
            <CancelChip label={row.cancelledByWhom} />
          )}
          {row.profession && row.isDone && <CompletedChip />}
          {row.profession && !row.isDone && <AssignedChip />}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <ToolTipButton
            onClick={() => handleOpenBookingDialog(row._id)}
            title="View"
            placement="top"
          >
            <VisibilityIcon color="primary" fontSize="small" />
          </ToolTipButton>
          <ToolTipButton
            onClick={() => handleDelete(row._id)}
            title="Delete"
            placement="top"
          >
            <DeleteIcon color="error" fontSize="small" />
          </ToolTipButton>
        </div>
      ),
    },
  ];

  return (
    <Page className={classes.root} title="Bookings">
      <Container maxWidth={false}>
        <TableToolbar hideAddButton component={<Instructions />} />
        <Box mt={3}>
          <DataTable
            data={data}
            title="Booking"
            columns={columns}
            actions={<SearchBar title="Booking" onSearch={handleSearch} />}
          />
        </Box>
      </Container>
      <Dialog />
      {/* Dropdown */}
      <StaffDialog />
      <VendorDialogDropdown />
    </Page>
  );
};

export default BookingList;
