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
import { setDateFromNow } from "../utils";
import { DeleteIcon } from "./Icon";
import ToolTipButton from "./ToolTipButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: "100%",
    borderRadius: 5,
    height: 250,
    objectFit: "contain",
  },
  video: {
    borderRadius: 5,
    width: "100%",
    height: 250,
    objectFit: "contain",
  },
}));

const ProductCard = ({ className, data, onDelete, video, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid item sm={12} md={4}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          {video ? (
            <video controls className={classes.video}>
              <source src={data.url} />
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : (
            <Box component={RouterLink} to={`/admin/video/${data._id}`}>
              <img
                src={data.image}
                className={classes.image}
                alt={data.title}
              />
            </Box>
          )}

          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {data.title}
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={2}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Created {setDateFromNow(data.createdAt)}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <ToolTipButton title="Delete" onClick={() => onDelete(data._id)}>
                <DeleteIcon />
              </ToolTipButton>
              {/* <GetAppIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
            {"12"} Downloads
            </Typography> */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export default ProductCard;
