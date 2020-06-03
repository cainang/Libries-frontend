import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../firebase/Auth.js";
import Header from './../components/Header'

const Home = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
    <Header dashboard={false} />
    </>
  );
};

export default withRouter(Home);
