import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import getInitials from "../utils/getInitials";
import setEmptyStr from "../utils/setEmptyStr";
import { BASE_URL } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

function ProfileName({ image, name, square }) {
  const classes = useStyles();
  let _image = String(image);
  const imageURL =
    _image.search("storage") !== -1 ? `${BASE_URL}${image}` : image;

  return (
    <Box alignItems="center" display="flex">
      <Avatar
        className={classes.avatar}
        style={{ borderRadius: square && 2 }}
        src={imageURL}
      >
        {getInitials(name)}
      </Avatar>
      <Typography color="textPrimary" variant="body1">
        {setEmptyStr(name)}
      </Typography>
    </Box>
  );
}

ProfileName.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default ProfileName;
