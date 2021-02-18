import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
// mui
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import CountUp from "react-countup";

const Budget = ({
  className,
  title,
  count,
  icon: Icon,
  color,
  url,
  ...rest
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    avatar: {
      backgroundColor: color,
      height: 56,
      width: 56,
    },
  }));
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
          component={RouterLink}
          to={url}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              <CountUp start={0} end={count} duration={2.5} separator="," />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Icon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
