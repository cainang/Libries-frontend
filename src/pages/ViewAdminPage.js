import React, {useCallback, useEffect, useState} from "react";
import { withRouter } from "react-router";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../services/api";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';
import './styles/login.css'


const ViewAdminPage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var history = useHistory();
  var {idpage} = useParams();
  var p1, p2, p3;
  const [editCond, setEditCond] = useState(0);
  const [editUrl, setEditUrl] = useState("");
  if(editUrl.indexOf("watch") !== -1){
    var p1 = editUrl.slice(0,24);
    var p2 = editUrl.slice(32,editUrl.length);
    var p3 = `${p1}embed/${p2}`;
  } else if(editUrl.indexOf("https://youtu.be/") !== -1) {
    var p1 = "https://www.youtube.com/";
    var p2 = editUrl.slice(17,editUrl.length);
    var p3 = `${p1}embed/${p2}`;
  }
  

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  useEffect(() => {
    api.get(`libries/${idpage}`).then(res => {
      res.data.map(d => {
        setEditCond(d.condicao);
        setEditUrl(d.url_expressao)
      })
    })
  }, []);

  return (
    <>
      <Header dashboard={true}/>
      <Title setTitle="Visualizar Expressão" />
      <div id="flex" style={{display: "flex", justifyContent: "center"}}>
        <div className="cont" style={{width: "500px",flexDirection: "column", display: "flex", justifyContent: "center"}}>
        <iframe width="560" height="315" src={p3}  frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          
          <div>
          <Link to={`/dashboard/admin/edit/${idpage}`}>
            <input className="btn" type="button" value="Editar Condição" style={{color: "#000"}}/>
          </Link>
          <Link to={`/dashboard/admin/`}>
            <input className="btn" type="button" value="Voltar" style={{color: "#000"}}/>
          </Link>
          </div>
        </div>
      </div>
      
      
    </>
  );
};

export default withRouter(ViewAdminPage);
