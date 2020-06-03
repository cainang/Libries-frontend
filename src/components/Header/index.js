import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <>
    <div class="header">
        <h2 class="logo">Libries</h2>
        <input type="checkbox" name="" id="chk"/>
        <label for="chk" class="show-menu-btn">
            <i class="fas fa-ellipsis-h"></i>
        </label>

        <ul class="menu" id="#f8a213">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/account">Conta</Link>
            <label for="chk" class="hide-menu-btn">
                <i class="fas fa-times"></i>
            </label>
        </ul>
    </div>
    </>
    );
}

export default Header;