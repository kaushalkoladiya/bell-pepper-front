import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  Briefcase as BookingIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { logoutAdmin } from "../../../redux/admin/actions";
import { useDispatch, useSelector } from "react-redux";

const user = {
  avatar: "../../../images/icon.jpeg",
  jobTitle: "Root Admin",
  name: "Dummy User",
};

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  let items;
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const userData = useSelector((state) => state.admin.data);
  const userType = useSelector((state) => state.admin.userType);
  console.log(userType);
  const isRootUser = userType === "ROOT_USER" ? true : false;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogOut = () => {
    dispatch(logoutAdmin());
    navigation("/login", { replace: true });
  };

  if (isRootUser) {
    items = [
      {
        href: "/admin/dashboard",
        icon: BarChartIcon,
        title: "Dashboard",
      },
      {
        href: "/admin/customers",
        icon: UsersIcon,
        title: "Customers",
      },
      {
        href: "/admin/staff",
        icon: UsersIcon,
        title: "Staffs",
      },
      {
        href: "/admin/vendors",
        icon: UsersIcon,
        title: "Vendors",
      },
      {
        href: "/admin/services",
        icon: ShoppingBagIcon,
        title: "Services",
      },
      {
        href: "/admin/bookings",
        icon: BookingIcon,
        title: "Bookings",
      },
      {
        href: "/admin/account",
        icon: UserIcon,
        title: "Account",
      },
    ];
  } else {
    items = [
      {
        href: "/partners/dashboard",
        icon: BarChartIcon,
        title: "Dashboard",
      },
      {
        href: "/partners/staff",
        icon: UsersIcon,
        title: "Staffs",
      },
      {
        href: "/partners/bookings",
        icon: BookingIcon,
        title: "Bookings",
      },
      {
        href: "/partners/account",
        icon: UserIcon,
        title: "Account",
      },
    ];
  }

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to={isRootUser ? "/admin/account" : "/partners/account"}
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userData.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userData.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <NavItem
            icon={LogOutIcon}
            title="Log out"
            handleOnClick={handleLogOut}
          />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
