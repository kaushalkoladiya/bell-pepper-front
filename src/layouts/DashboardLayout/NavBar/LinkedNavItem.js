import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "@material-ui/core";

const LinkedNavItem = (props) => {
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

LinkedNavItem.propTypes = {};

export default LinkedNavItem;
