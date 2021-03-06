import React,{ useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import Header from './../components/Header';
import Title from './../components/Title';
import firebase from 'firebase';
import './styles/userdashboard.css';
import api from './../services/api';
import { confirmAlert } from 'react-confirm-alert';


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
  }, [cu]);

  const handleDelete = async (id, exp) => {
    const options = {
      title: `Deletar: ${exp}`,
      message: "Você Realmente deseja Apagar essa Expressão?",
      buttons: [
        {
          label: 'Sim',
          onClick: async () => await api.delete(`libries/${id}`)
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    };
    confirmAlert(options);
  }

  if(name == null){
    return <Redirect to="/account/editname"/>;
  }
  if(email == 'admin@admin.com'){
    return <Redirect to="/dashboard/admin"/>;
  }
  

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
                  <div style={{display: "flex"}}>
                  <button onClick={() => handleDelete(lib.id, lib.expressao)} style={{background: "none", border: "none", fontSize: "20px", cursor: "pointer"}}>
                      <i className="fa fa-trash" aria-hidden="true" style={{color: "#fff", marginBottom: "10px"}}></i>
                    </button>
                    <Link to={`/dashboard/edit/${lib.id}`}>
                      <button style={{background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginLeft:"30px"}}>
                        <i className="fa fa-edit" aria-hidden="true" style={{color: "#fff", marginBottom: "10px"}}></i>
                      </button>
                    </Link>
                  </div>
                    
                    <span>{lib.expressao}</span><br/>
                    <span className="category" style={lib.condicao == false ? {background: 'red'} : {background: 'green'}}>{lib.condicao == false ? 'Em Análise':'Analizado'}</span>
                </div>
            </div>
          )
        })}

        {cu.length == 0 && (
          <h2 style={{color:"#aaa"}}>Você não tem Nenhuma Expressão Cadastrada!</h2>
        )}
        
      </div>
    </>
  );
};

export default UserDashboard;
