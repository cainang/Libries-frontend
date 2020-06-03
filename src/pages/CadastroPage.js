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
      <div className="section">
          <div className="profile">
              {photoUrl !== null && (<img src={photoUrl} />)}
              {photoUrl == null && (<img src="https://anebrasil.org.br/wp-content/uploads/2016/06/img-user-geral.png" />)}
              {name !== null && (<h2>{name}</h2>)}
              {name == null && (<h2><Link style={{color: "#000", textDecoration: "none"}} to="/dashboard">Nome do Usuario</Link></h2>)}
              
          </div>
          <div className="config">
              <div className="con">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <p>Trocar de Senha</p>
              </div>
              <div className="con">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <p>Trocar Nome</p>
              </div>
              <div className="con">
                  <button onClick={() => app.auth().signOut()} style={{display: "flex", background: "transparent", border: "none", cursor: "pointer"}}>
                    <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                    <p>Sair</p>
                  </button>
              </div>
          </div>
          
      </div>
      
    </>
  );
};

export default withRouter(CadastroPage);
