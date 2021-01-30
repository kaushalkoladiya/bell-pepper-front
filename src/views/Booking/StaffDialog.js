import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// redux
import { useSelector, useDispatch } from "react-redux";
import { assignStaff, closeStaffDialog } from "../../redux/booking/actions";
import axios from "axios";

import { alert } from "../../utils/alert";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function StaffDialog({ onChange }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [staffs, setStaffs] = React.useState([]);
  const [selectedStaff, setSelectedStaff] = React.useState("");

  const { bookingId, vendorId, isBookingDialogOpen: open } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (vendorId) fetchData();
  }, [vendorId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/staff/vendor/${vendorId}`);
      setStaffs(data.data.staffs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(closeStaffDialog());
  };

  const handleChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  const handleSubmit = async () => {
    if (!vendorId || !bookingId) {
      return alert("Contact your developer!");
    }
    try {
      const formData = {
        staffId: selectedStaff,
        bookingId: bookingId,
      };
      const { data } = await axios.put(`/booking/assignStaff`, formData);
      dispatch(
        assignStaff({
          bookingId,
          bookingData: data.data.booking,
        })
      );

      alert("Done", data.message, "success");
      handleClose();
    } catch (error) {
      console.log(error);
      alert("Warning", error?.response?.data?.message, "warning");
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Choose Staff for this job!</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-dialog-native">Choose Staff</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={selectedStaff}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {staffs.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
