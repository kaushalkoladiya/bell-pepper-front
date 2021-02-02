import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { closeServiceDialog } from "../../redux/service/actions";

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

  const [service, setService] = useState({});

  const { dialogId, isDialogOpen: open, data: _data } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    if (dialogId) {
      const index = _data.findIndex((item) => item._id === dialogId);
      if (index !== -1) {
        setService(_data[index]);
      }
    }
  }, [dialogId, _data]);

  const handleClose = () => {
    dispatch(closeServiceDialog());
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
        <Typography variant="h3">Service Details</Typography>
      </DialogTitle>
      <MuiDialogContent>
        {service.title && (
          <Grid container>
            <Grid item md={12}>
              <div className={classes.imageContainer}>
                <Image image={service.image} extraLarge />
              </div>
              <div className={classes.dataLine}>
                <Typography variant="h5">Title:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {service.title}
                </Typography>
              </div>
              <div className={classes.dataLine}>
                <Typography variant="h5">Description:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {service.description}
                </Typography>
              </div>
              <div className={classes.dataLine}>
                <Typography variant="h5">Price:&nbsp;</Typography>
                <Typography variant="h6" color="textSecondary">
                  {service.price}
                </Typography>
              </div>

              <Typography
                className={classes.dataLine}
                variant="caption"
                color="textSecondary"
              >
                Registration Date: {setDate(service.createdAt)}
              </Typography>
            </Grid>
            <Grid item md={12}>
              <div className={classes.accordion}>
                <Accordion disabled={service?.vendorId ? false : true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Vendor Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
                    <div>
                      <ProfileName name={service.vendorId.companyName} />
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Mobile:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {setEmptyStr(service.vendorId.mobile)}
                        </Typography>
                      </div>
                      <div className={classes.dataLine}>
                        <Typography variant="h5">Address:&nbsp;</Typography>
                        <Typography variant="h6" color="textSecondary">
                          {`${service.vendorId.address.houseNumber}, ${service.vendorId.address.street} ${service.vendorId.address.city}`}
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
