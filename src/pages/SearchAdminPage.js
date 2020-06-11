import React,{ useState, useEffect } from "react";
import { Link, Redirect, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from './../components/Header';
import Title from './../components/Title';
import firebase from 'firebase';
import './styles/admindashboard.css'
import api from './../services/api'


const SearchAdminPage = () => {
  var user = firebase.auth().currentUser;
  var name,email, photoUrl, uid;
  const {search} = useParams();

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  const libries = [];
  const [cu,setCu] = useState([]);
  
  function titleize(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];

        if( w.length > 2){ 
           w = firstLetter.toUpperCase() + w.slice(1);
        } else {
           w = firstLetter + w.slice(1);
        }

        words[a] = w;
    }
    return words.join(" ");
}


  useEffect(() => {
    api.get('search', {
      params: {
        search: titleize(search),
      }
    }).then(liuser => {
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
      <Header dashboard={true} account={true}/>
      <div id="caduser">
        <h2>{`Resultado da Busca: ${search}`}</h2>
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
          <h2 style={{color:"#aaa"}}>Nenhuma Expressão Encontrada!</h2>
        )}
        
      </div>
    </>
  );
};

export default SearchAdminPage;
