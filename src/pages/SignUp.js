import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "./../firebase/base";
import { AuthContext } from "./../firebase/Auth.js";
import './styles/login.css';
import firebase from 'firebase';


const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }, [history]);

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
      <h1>Cadastro</h1>
      <form onSubmit={handleSignUp}>
        <div class="textbox">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input name="email" type="email" placeholder="Email" />
        </div>
        <div class="textbox">
            <i class="fa fa-lock" aria-hidden="true"></i>
            <input name="password" type="password" placeholder="Senha" />
        </div>
        <input class="btn" type="submit" value="Cadastra-se"/>
        <button class="btn" style={{background: "#FFF", color: "#000"}} onClick={handleLoginGoogle}><img style={{width: "20px", height: "20px", marginRight: "19px"}} src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/> Cadastra-se com Google</button>
        <Link to='/login'><input class="btn" type="submit" value="Fazer Login"/></Link>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
