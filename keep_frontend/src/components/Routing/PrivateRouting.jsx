import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRouting = ({ component: Component, auth: { token }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token === null ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouting);
