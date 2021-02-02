import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const AuthRoute = ({ component: Component, isAuth, ...rest }) => (
  <Fragment>
    {isAuth ? (
      <Navigate to="/partners/dashboard" />
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
});

export default connect(mapStateToProps)(AuthRoute);
