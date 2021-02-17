import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { setDateFromNow } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  image: {
    maxWidth: "100%",
    borderRadius: 5,
  },
}));

const TutorialCard = ({ className, tutorial, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      component={RouterLink}
      to={`/admin/video/${tutorial._id}`}
    >
      <CardContent>
        <img
          src={tutorial.image}
          className={classes.image}
          alt={tutorial.title}
        />

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {tutorial.title}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Created {setDateFromNow(tutorial.createdAt)}
            </Typography>
          </Grid>
          {/* <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {"12"} Downloads
            </Typography>
          </Grid> */}
        </Grid>
      </Box>
    </Card>
  );
};

TutorialCard.propTypes = {
  className: PropTypes.string,
  tutorial: PropTypes.object.isRequired,
};

export default TutorialCard;
