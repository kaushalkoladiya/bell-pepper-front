import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

// MUI
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

// types
import NavItem from "./NavItem";

// icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedNavItem = ({ icon: Icon, title, ...res }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return !res.nested ? (
    <ListItem button className={res.className}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  ) : (
    <Fragment>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {res.array?.map(({ title, icon: Icon }, index) => (
            <NavItem
              key={index}
              className={classes.nested}
              icon={Icon}
              title={title}
            />
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

NestedNavItem.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  nested: PropTypes.bool,
};

export default NestedNavItem;
