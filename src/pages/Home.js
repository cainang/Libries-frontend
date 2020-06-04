import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth.js";
import Header from './../components/Header';
import './styles/home.css'

const Home = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
    <Header dashboard={false} />
    <div className="sectionh">
      <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f590-fe0f.svg" alt="Libries"/>
      <h1>Libries</h1>
      <Link to='/login'>
        <button>Venha Contribuir para as Libras!</button>
      </Link>
      <p>Uma Organização que Busca Ajudar Pessoas com Deficiência Auditiva e a Comunidade das Libras!</p>
    </div>
    </>
  );
};

export default withRouter(Home);
