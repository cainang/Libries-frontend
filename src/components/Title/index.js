import React from 'react';
import './style.css';

function Title({setTitle}) {
  return (
    <>
    <div className="title">
        <h1>{setTitle}</h1>
    </div>
    </>
    );
}

export default Title;