import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './styles.css';

function Cabecera({ abrirCarrito, hanldeLogOut }) {
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
          <img className="logoCarrito" src="bag.png" alt="Carrito" />
        </button>
        <button className="logos">
          <img className="logout" src="logout.png" alt="Salir" onClick={hanldeLogOut}/>
        </button>
        <button className="logos">
          <img className="user" src="user.png" alt="Usuario" />
        </button>
      </div>
    </header>
  );
}

export default Cabecera;
