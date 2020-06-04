import React, {useCallback} from "react";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';
import './styles/login.css'


const EditPasswordPage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var history = useHistory();

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  

  const handleEditPassword = useCallback(
    async event => {
      event.preventDefault();
      const { newp } = event.target.elements;
      const senhan = newp.value;
        user.updatePassword(senhan).then(function() {
          // Update successful.
          alert("Troca de Senha feita com Sucesso!");
          history.push('/account');
        }).catch(function(error) {
          alert(error);
        });
    }
  );

  return (
    <>
      <Header dashboard={true}/>
      <Title setTitle="Editar Expressão" />
      <div id="flex" style={{display: "flex", justifyContent: "center"}}>
        <div className="cont" style={{width: "500px", display: "flex", justifyContent: "center"}}>
          <form onSubmit={handleEditPassword} style={{width: "465px"}}>
              <div className="textbox">
                  <input name="newp" type="password" placeholder="Senha Nova" style={{color: "#000"}} />
              </div>
              <input className="btn" type="submit" value="Editar Senha" style={{color: "#000"}}/>
              <Link to='/account'>
                <input className="btn" type="button" value="Voltar" style={{color: "#000"}}/>
              </Link>
          </form>
        </div>
      </div>
      
      
    </>
  );
};

export default withRouter(EditPasswordPage);
