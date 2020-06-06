import React,{ useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from './../components/Header';
import Title from './../components/Title';
import firebase from 'firebase';
import './styles/admindashboard.css'
import api from './../services/api'


const AdminDashboard = () => {
  var user = firebase.auth().currentUser;
  var name,email, photoUrl, uid;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  const libries = [];
  const [cu,setCu] = useState([]);
  

  useEffect(() => {
    api.get(`libries`).then(liuser => {
      setCu(liuser.data);
    })
  }, [cu]);

  const handleDelete = async (id,exp) => {
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
  if(email !== 'admin@admin.com'){
    return <Redirect to="/dashboard"/>;
  }

  return (
    <>
      <Header dashboard={true}/>
      {name && (<Title setTitle={`Bem-Vindo, ${name}!`}/>)}
      {!name && (<Title setTitle={`Bem-Vindo!`}/>)}
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
                    <Link to={`/dashboard/admin/view/${lib.id}`}>
                      <button style={{background: "none", border: "none", fontSize: "20px", cursor: "pointer", marginLeft:"30px"}}>
                        <i className="fa fa-eye" aria-hidden="true" style={{color: "#fff", marginBottom: "10px"}}></i>
                      </button>
                    </Link>
                  </div>
                    
                    <span>{lib.expressao}</span><br/>
                    <span>{lib.autor}</span><br/>
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

export default AdminDashboard;
