import React, { useCallback } from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import './style.css';

function Header({dashboard, account = true}) {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        uid = user.uid; 
    }

    const history = useHistory();

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

    const handleClick = useCallback(
        async event => {
          event.preventDefault();
          const { search } = event.target.elements;
          try {
                history.push(`admin/search/${titleize(search.value)}`);
          } catch (error) {
            alert(error);
          }
        },
        []
      );

    return (
    <>
    <div className="header">
        <h2 className="logo">Libries</h2>
        <input type="checkbox" name="" id="chk"/>
        <label htmlFor="chk" className="show-menu-btn">
            <i className="fas fa-ellipsis-h"></i>
        </label>

        {dashboard === true && (
            <>
            {account == false && (
                <form id="search" onSubmit={handleClick}>
                    <input style={{marginRight: "20px", border: "none", borderRadius: "5px"}} type="search" name="search" id=""/>
                    <input id="in1" style={{ background: "#f8c52c", color: "#fff"}} type="submit" value="Pesquisar"/>
                </form>
            )}
            <ul className="menu" id="#f8a213">
                {email == 'admin@admin.com' ? <Link to="/dashboard/admin">Página Inicial</Link> : <Link to="/dashboard">Página Inicial</Link>}
                <Link to="/account">Conta</Link>
                <label htmlFor="chk" className="hide-menu-btn">
                    <i className="fas fa-times"></i>
                </label>
            </ul>
            </>
        )}
        {dashboard === false && (
            <ul className="menu" id="#f8a213">
                <Link to="/">Página Inicial</Link>
                <Link to="/login">Entrar</Link>
                <Link to="/signup">Cadastre-se</Link>
                <label htmlFor="chk" className="hide-menu-btn">
                    <i className="fas fa-times"></i>
                </label>
            </ul>
        )}
    </div>
    </>
    );
}

export default Header;