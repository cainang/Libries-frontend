import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "./../firebase/base.js";
import { AuthContext } from "./../firebase/Auth.js";
import firebase from 'firebase';
import './styles/login.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleLoginGoogle = useCallback(
    async event => {
      event.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase
          .auth()
          .signInWithPopup(provider).then().catch();
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <div class="login-box" style={{backgroundColor: "#f8c52c", paddingTop: "11%", paddingBottom: "12%",paddingLeft: "15%", paddingRight: "15%"}}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div class="textbox">
              <i class="fa fa-user" aria-hidden="true"></i>
              <input name="email" type="email" placeholder="Email" />
          </div>
          <div class="textbox">
              <i class="fa fa-lock" aria-hidden="true"></i>
              <input name="password" type="password" placeholder="Senha" />
          </div>
          <input class="btn" type="submit" value="Entrar"/>
          <button class="btn" style={{background: "#FFF", color: "#000"}} onClick={handleLoginGoogle}><img style={{width: "20px", height: "20px", marginRight: "19px"}} src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/> Logar com Google</button>
          <Link to='/signup'><input class="btn" type="submit" value="Cadastra-se"/></Link>
        </form>
    </div>
  );
};

export default withRouter(Login);
