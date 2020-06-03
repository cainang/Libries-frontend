import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../firebase/base.js";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';


const CadastroPage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  return (
    <>
      <Header dashboard={true}/>
      <Title setTitle="Sua Conta" />
      
      
    </>
  );
};

export default withRouter(CadastroPage);
