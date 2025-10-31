import React, { Children, use } from "react";
import { AuthContext } from "./AuthProvider";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {

    const location = useLocation()
    // console.log(location)


  const { userData, loading } = use(AuthContext);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  } else if (userData) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }
};

export default PrivateRoute;
