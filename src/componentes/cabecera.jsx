import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './styles.css';

import bag from ".//images/bag.png"

function Cabecera({ abrirCarrito }) {
  //*-------------------------------------------- JSX del componente ------------------------------------------------
  return (
    <header>
      <div className="titulo">
        <div>
          <Link className="buttonNav" to="/">Home</Link> 
        </div>
        <div>
          <Link className="buttonNav" to="/materials">Materials</Link> 
        </div>
        <div>
          <Link className="buttonNav" to="/doubts">Doubts</Link> 
        </div>
      </div>
      <div>
        <button className="logos" onClick={abrirCarrito}>
          <img className="logoCarrito" src={bag} alt="Carrito" />
        </button>
        <button className="logos">
          <img className="user" src="/images/user.png" alt="Usuario" />
        </button>
      </div>
    </header>
  );
  //*------------------------------------------------------------------------------------------------------------

}

export default Cabecera;
