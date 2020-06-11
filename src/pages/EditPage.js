import React, {useCallback, useEffect, useState} from "react";
import { withRouter } from "react-router";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../services/api";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';
import './styles/login.css'


const EditPage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var history = useHistory();
  var {idpage} = useParams();
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    uid = user.uid; 
  }
  useEffect(() => {
    api.get(`libries/${idpage}`).then(res => {
      res.data.map(d => {
        setEditName(d.expressao);
        setEditUrl(d.url_expressao);
      })
      
    })
  }, []);

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

  const handleEdit = useCallback(
    async event => {
      event.preventDefault();
      const { namex, link } = event.target.elements;
      const expressao = namex.value;
      const url_expressao = link.value;
      var data = {};
      if(url_expressao.indexOf("embed") !== -1 || url_expressao.indexOf("watch?v") !== -1 || url_expressao.indexOf("https://youtu.be/") !== -1){
        var data = {
          expressao: titleize(expressao),
          url_expressao,
        };
      } else {
        return alert("Link Incorreto: Url Copie o Link do Youtube!");
      }
      try {
        await api.put(`libries/${idpage}`, data);
        alert("Expressão Alterada com Sucesso!");
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    }
  );

  return (
    <>
      <Header dashboard={true}/>
      <Title setTitle="Editar Expressão" />
      <div id="flex" style={{display: "flex", justifyContent: "center"}}>
        <div className="cont" style={{width: "500px", display: "flex", justifyContent: "center"}}>
          <form onSubmit={handleEdit} style={{width: "465px"}}>
              <div className="textbox">
                  <input name="namex" defaultValue={editName} type="text" placeholder="Nome da Expressão" style={{color: "#000"}} />
              </div>
              <div className="textbox">
                  <input name="link" defaultValue={editUrl} type="url" placeholder="Url do Vídeo" style={{color: "#000"}} />
              </div>
              <input className="btn" type="submit" value="Editar" style={{color: "#000"}}/>
              <Link to='/dashboard'>
                <input className="btn" type="button" value="Voltar" style={{color: "#000"}}/>
              </Link>
          </form>
        </div>
      </div>
      
      
    </>
  );
};

export default withRouter(EditPage);
