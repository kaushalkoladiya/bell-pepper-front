import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

// icons
import CloseIcon from "@material-ui/icons/Close";

// components
import Image from "../../components/Image";
import ToolTipButton from "../../components/ToolTipButton";
import ProfileName from "../../components/ProfileName";

// utils
import setEmptyStr from "../../utils/setEmptyStr";
import setDate from "../../utils/setDate";
import { closeBookingDialog } from "../../redux/booking/actions";

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  imageContainer: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    right: "10px",
    top: "5px",
  },
  textCenter: {
    textAlign: "center",
    padding: 5,
  },
  dataLine: {
    margin: "5px 0",
    display: "flex",
    alignItems: "baseline",
  },
  accordionDetails: {},
}));

const Dialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [booking, setBooking] = useState({});

  const { dialogId, isDialogOpen: open, data: _data } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((item) => item._id === dialogId);
      if (index !== -1) {
        setBooking(_data[index]);
      }
    }
  }, [dialogId, _data]);

  const handleClose = () => {
    dispatch(closeBookingDialog());
  };

  return (
    <MuiDialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
    >
      <DialogTitle id="simple-dialog-title">
        <ToolTipButton
          title="Close"
          onClick={handleClose}
          btnClass={classes.closeButton}
        >
          <CloseIcon />
        </ToolTipButton>
        <Typography variant="h3">Booking Details</Typography>
      </DialogTitle>
      <MuiDialogContent>
        {booking.vendorId && (
          <Grid container>
            <Grid item md={12}>
              <div className={classes.dataLine}>
                <Typography variant="h5">Instruction:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {booking.description}
                </Typography>
              </div>

              <div className={classes.dataLine}>
                <Typography variant="h5">Frequency:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {booking.frequency}
                </Typography>
              </div>

              <div className={classes.dataLine}>
                <Typography variant="h5">Hours:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {booking.howManyHours}
                </Typography>
              </div>

              <div className={classes.dataLine}>
                <Typography variant="h5">Professions:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {booking.howManyProfessions}
                </Typography>
              </div>

              <div className={classes.dataLine}>
                <Typography variant="h5">Date & Time:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {booking.date},&nbsp;{booking.time}
                </Typography>
              </div>

              <Typography
                className={[classes.dataLine, { marginLeft: "auto" }].join(" ")}
                variant="caption"
                color="textSecondary"
              >
                Registration Date: {setDate(booking.createdAt)}
              </Typography>
            </Grid>
            <Grid item md={12}>
              <div className={classes.accordion}>
                <Accordion disabled={booking?.userId ? false : true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      User Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Name:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {booking.userId.name}
                        </Typography>
                      </div>

                      <div className={classes.dataLine}>
                        <Typography variant="h5">Email:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {booking.userId.email}
                        </Typography>
                      </div>

                      <div className={classes.dataLine}>
                        <Typography variant="h5">Location:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(booking.userId.location)}
                        </Typography>
                      </div>

                      <div className={classes.dataLine}>
                        <Typography variant="h5">Gender:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(booking.userId.gender)}
                        </Typography>
                      </div>

                      <Typography
                        className={classes.dataLine}
                        variant="caption"
                        color="textSecondary"
                      >
                        Joined Date:&nbsp;
                        {setDate(booking.serviceId.createdAt)}
                      </Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion disabled={booking?.serviceId ? false : true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Service Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ margin: "auto" }}>
                      <div className={classes.imageContainer}>
                        <Image image={booking.serviceId.image} extraLarge />
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Title:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {booking.serviceId.title}
                        </Typography>
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Description:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {booking.serviceId.description}
                        </Typography>
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Price:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {booking.serviceId.price}
                        </Typography>
                      </div>

                      <Typography
                        className={classes.dataLine}
                        variant="caption"
                        color="textSecondary"
                      >
                        Created At:&nbsp;
                        {setDate(booking.serviceId.createdAt)}
                      </Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion disabled={booking?.vendorId ? false : true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Vendor Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <ProfileName name={booking.vendorId.companyName} />
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Mobile:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(booking.vendorId.mobile)}
                        </Typography>
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Address:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(booking.vendorId.address)}
                        </Typography>
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">City:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(booking.vendorId.city)}
                        </Typography>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
          </Grid>
        )}
      </MuiDialogContent>
    </MuiDialog>
  );
};

export default Dialog;
