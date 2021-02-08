import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const AuthRoute = ({ component: Component, isAuth, userType, ...rest }) => (
  <Fragment>
    {isAuth ? (
      <Navigate
        to={
          userType === "ROOT_USER" ? "/admin/dashboard" : "/partners/dashboard"
        }
      />
    ) : (
      <Route element={<Component />} {...rest} />
    )}
  </Fragment>
);

AuthRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.admin.isAuth,
  userType: state.admin.userType,
});

export default connect(mapStateToProps)(AuthRoute);
