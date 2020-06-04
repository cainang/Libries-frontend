import React, {useCallback} from "react";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';
import './styles/login.css'


const EditNamePage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var history = useHistory();

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }

  const handleEditName = useCallback(
    async event => {
      event.preventDefault();
      const { newn } = event.target.elements;
      const newnome = newn.value;
      if(newnome == ""){
        return;
      }
      user.updateProfile({
        displayName: newnome,
      }).then(function() {
        alert("Nome Alterado Com Sucesso!");
        history.push('/account');
      }).catch(function(error) {
        alert(error)
      });
    }
  );

  return (
    <>
      {name == null && (<Header />)}
      {name && (<Header dashboard={true}/>)}
      {name == null && (<Title setTitle="Criar Nome" />)}
      {name && (<Title setTitle="Editar Nome" />)}
      
      <div id="flex" style={{display: "flex", justifyContent: "center"}}>
        <div className="cont" style={{width: "500px", display: "flex", justifyContent: "center"}}>
          <form onSubmit={handleEditName} style={{width: "465px"}}>
              <div className="textbox">
                  <input name="newn" type="text" placeholder="Novo Nome" style={{color: "#000"}} />
              </div>
              {name == null && (<input className="btn" type="submit" value="Criar Nome" style={{color: "#000"}}/>)}
              {name && (<input className="btn" type="submit" value="Editar Nome" style={{color: "#000"}}/>)}
              {name && (
                <Link to='/account'>
                  <input className="btn" type="button" value="Voltar" style={{color: "#000"}}/>
                </Link>
              )}
          </form>
        </div>
      </div>
      
      
    </>
  );
};

export default withRouter(EditNamePage);
