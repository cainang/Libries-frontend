import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function Header({dashboard}) {
  return (
    <>
    <div className="header">
        <h2 className="logo">Libries</h2>
        <input type="checkbox" name="" id="chk"/>
        <label htmlFor="chk" className="show-menu-btn">
            <i className="fas fa-ellipsis-h"></i>
        </label>

        {dashboard === true && (
            <ul className="menu" id="#f8a213">
                <Link to="/dashboard">Página Inicial</Link>
                <Link to="/account">Conta</Link>
                <label htmlFor="chk" className="hide-menu-btn">
                    <i className="fas fa-times"></i>
                </label>
            </ul>
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