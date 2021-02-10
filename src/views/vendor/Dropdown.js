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
import { assignVendor, closeVendorDialog } from "../../redux/booking/actions";
import axios from "axios";

import { alert } from "../../utils/alert";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function VendorDialogDropdown() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isVendorDialogOpen: open, bookingId } = useSelector(
    (state) => state.booking
  );
  const { data: vendorData } = useSelector((state) => state.vendor);

  const [selectedVendor, setSelectedVendor] = React.useState("");

  useEffect(() => {
    if (!open) setSelectedVendor("");
  }, [open]);

  const handleClose = () => {
    dispatch(closeVendorDialog());
  };

  const handleChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        bookingId,
        vendorId: selectedVendor,
      };
      const { data } = await axios.put(`/booking/assignVendor`, formData);
      dispatch(
        assignVendor({
          bookingId,
          bookingData: data.data.booking,
        })
      );
      alert("Done", data.message, "success");
      handleClose();
    } catch (error) {
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
      <DialogTitle>Choose Vendor for this job!</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="vendor-dialog-native">Choose Vendor</InputLabel>
          <Select
            labelId="vendor-dialog-select-label"
            id="vendor-dialog-select"
            value={selectedVendor}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vendorData.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.companyName}
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
