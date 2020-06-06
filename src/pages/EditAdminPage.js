import React, {useCallback, useEffect, useState} from "react";
import { withRouter } from "react-router";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../services/api";
import firebase from 'firebase';
import Header from "../components/Header";
import Title from "../components/Title";
import './styles/account.css';
import './styles/login.css'


const EditAdminPage = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  var history = useHistory();
  var {idpage} = useParams();
  const [editCond, setEditCond] = useState(0);

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

      })
    })
  }, []);

  const handleEdit = useCallback(
    async event => {
      event.preventDefault();
      const { condx } = event.target.elements;
      const condicao = condx.checked;
      const data = {
        condicao: condicao
      };
      try {
        await api.put(`libries/admin/${idpage}`, data);
        alert("Expressão Alterada com Sucesso!");
        history.push('/dashboard/admin');
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
                  <label>Condição</label>
                  <input name="condx" defaultValue={editCond == 0 ? false : true} type="checkbox"  style={{color: "#000"}} />
              </div>
              <input className="btn" type="submit" value="Editar" style={{color: "#000"}}/>
              <Link to='/dashboard/admin'>
                <input className="btn" type="button" value="Voltar" style={{color: "#000"}}/>
              </Link>
          </form>
        </div>
      </div>
      
      
    </>
  );
};

export default withRouter(EditAdminPage);
