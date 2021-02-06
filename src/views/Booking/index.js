import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  colors,
  Container,
  makeStyles,
  Chip as MuiChip,
  Tooltip,
  Button,
  Typography,
} from "@material-ui/core";
// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";

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
} from "../../redux/booking/actions";
import Dialog from "./Dialog";
import StaffDialog from "./StaffDialog";
import { setEmptyStr, trimStr } from "../../utils";
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import Chip from "../../components/Chip";
import ToolTipButton from "../../components/ToolTipButton";
import { warning, alert } from "../../utils/alert";

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

const Instructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.instructionContainer}>
      <div className={classes.instructionItem}>
        <Typography>Cancel by someone</Typography>
        <Chip type="cancel" label="Vendor" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Assigned successfully</Typography>
        <Chip type="success" label="Assigned" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Job finished</Typography>
        <Chip type="success" label="Completed" />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Who has done the job</Typography>
        <MuiChip
          label={"Staff"}
          size="small"
          style={{
            backgroundColor: colors.green[500],
            color: colors.common.white,
          }}
          icon={<Avatar />}
        />
      </div>
      <div className={classes.instructionItem}>
        <Typography>Assign to whom</Typography>
        <MuiChip label={"Staff"} size="small" icon={<Avatar />} />
      </div>
    </div>
  );
};
const BookingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state.booking.data);

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

  const handleOpenStaffAssignDialog = (serviceId, bookingId) => {
    dispatch(openStaffDialog({ serviceId, bookingId }));
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
      cell: (row) => row.serviceId.title,
      sortable: true,
    },
    {
      name: "User",
      cell: (row) => row.userId.name,
      sortable: true,
    },
    {
      name: "Instruction",
      cell: (row) => (
        <Tooltip title={setEmptyStr(row.description)}>
          <Button
            className={classes.description}
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            variant="text"
          >
            {trimStr(setEmptyStr(row.description))}
          </Button>
        </Tooltip>
      ),
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
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Time",
      selector: "time",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          {!row.profession && !row.isCancelled && (
            <ToolTipButton
              onClick={() =>
                handleOpenStaffAssignDialog(row.serviceId._id, row._id)
              }
              title="Assign Employee"
              placement="top"
            >
              <AssignmentIcon color="action" fontSize="small" />
            </ToolTipButton>
          )}
          {row.profession && !row.isCancelled && (
            <MuiChip
              label={row.profession.name}
              size="small"
              style={{
                backgroundColor:
                  row.profession && row.isDone && colors.green[500],
                color: row.profession && row.isDone && colors.common.white,
              }}
              icon={<Avatar />}
            />
          )}
          {row.isCancelled && row.cancelledByWhom && (
            <Chip type="cancel" label={row.cancelledByWhom} />
          )}
          {row.profession && row.isDone && (
            <Chip type="success" label="Completed" />
          )}
          {row.profession && !row.isDone && (
            <Chip type="success" label="Assigned" />
          )}
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
        <TableToolbar
          title="Booking"
          hideAddButton
          component={<Instructions />}
        />
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
      <StaffDialog />
    </Page>
  );
};

export default BookingListView;
