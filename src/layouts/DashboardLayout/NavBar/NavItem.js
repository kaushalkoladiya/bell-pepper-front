import React, { Fragment, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

// icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  nestedItem: {
    paddingLeft: 8,
    cursor: "pointer",
  },
  nestedIcon: {
    minWidth: 0,
    color: theme.palette.text.secondary,
  },
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  handleOnClick,
  nested,
  array,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return handleOnClick && !nested ? (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      onClick={handleOnClick}
    >
      <Button activeclassname={classes.active} className={classes.button}>
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  ) : (
    <Fragment>
      {nested ? (
        <Fragment>
          <ListItem
            onClick={() => setOpen(!open)}
            className={clsx(classes.item, classes.nestedItem, classes.button)}
            disableGutters
          >
            <ListItemIcon className={classes.nestedIcon}>
              <Icon className={classes.icon} size="20" />
            </ListItemIcon>
            <ListItemText primary={title} className={classes.title} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {array?.map(({ title, icon: Icon, href }, index) => (
                <NavItem
                  key={index}
                  className={classes.nested}
                  icon={Icon}
                  title={title}
                  href={href}
                />
              ))}
            </List>
          </Collapse>
        </Fragment>
      ) : (
        <ListItem className={clsx(classes.item, className)} disableGutters>
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
      )}
    </Fragment>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  array: PropTypes.array,
  nested: PropTypes.bool,
  handleOnClick: PropTypes.func,
};

export default NavItem;
