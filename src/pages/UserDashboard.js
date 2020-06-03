import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import Title from './../components/Title';
import firebase from 'firebase';
import './styles/userdashboard.css'
import api from './../services/api'

const UserDashboard = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  const libries = [];
  const [cu,setCu] = useState([]);

  useEffect(() => {
    api.get(`libries/user/${uid}`).then(liuser => {
      //console.log(liuser)
      //libries.push(liuser.data);
      setCu(liuser.data);
    })
    //console.log(libries);
  }, []);
  

  return (
    <>
      <Header dashboard={true}/>
      {name && (<Title setTitle={`Bem-Vindo, ${name}!`}/>)}
      {!name && (<Title setTitle={`Bem-Vindo!`}/>)}
      <div id="caduser">
          <h2>Cadastrar Nova Expressão?</h2>
          <Link to='/cadex'><button id='btn'>Cadastar!</button></Link>
      </div>
      <div id="caduser">
        <h2>Expressões Cadastradas</h2>
      </div>
      <div className="section">
        {cu.map(lib => {
          
          return (
            <div className="card" key={lib.id}>
                <div className="span">
                    <span>{lib.expressao}</span><br/>
                    <span className="category" style={{background: 'red'}}>{lib.condicao == false ? 'Em Análise':'Analizado'}</span>
                </div>
            </div>
          )
        })}
        
      </div>
    </>
  );
};

export default UserDashboard;
