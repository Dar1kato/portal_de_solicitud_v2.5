import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from "sonner";
import Bolsa from "./componentes/bolsa";
import Cabecera from "./componentes/cabecera";
import Materials from './pages/materiales'; 
import Doubts from './pages/dudas'; 
import { Navigate } from "react-router-dom";

function App() {
  const [bag, setBag] = useState([]);
  const [carritoWidth, setCarritoWidth] = useState('300');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function abrirCarrito() {
    setCarritoWidth('300px');
  }

  function cerrarCarrito() {
    setCarritoWidth('0');
  }

  function eliminarDeCarrito(index) {
    setBag(bag.filter((_, i) => i !== index));
  }

  function continuarPedido() {
    alert("El Dev aún no implementa esta función :(");
  }

  function handleLogin(e) {
    e.preventDefault();
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Toaster position="bottom-right" />
      <header className="navbar">
        <div className="titulo">
        <img src="/iberoPueblaImg.png" alt="Ibero Puebla" /><h1>Portal de Solicitud de Insumos</h1>
        </div>
      </header>

      <Bolsa bag={bag} cerrarCarrito={cerrarCarrito} carritoWidth={carritoWidth} eliminarDeCarrito={eliminarDeCarrito} continuarPedido={continuarPedido} />

      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Materials bag={bag} setBag={setBag} />} />
        ) : (
          <Route path="/" element={
            <div className="main">
              <div className="bienvenidaImagen">
                <img src="fachadaIbero.png"/>
                <div className="bienvenidaTexto">
                  <h1>¡Bienvenido!</h1>
                  <p>Inicia sesión para acceder</p>
                </div>
                <form class="logIn" onSubmit={handleLogin}>
                  <label>Correo electrónico:</label>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Contraseña:</label>
                  <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <br></br>
                  <button type="submit">Iniciar sesión</button>
                  </form>
              </div>
            </div>
          } />
        )}
        <Route path="/materials" element={<Materials bag={bag} setBag={setBag} />} />
        <Route path="/doubts" element={<Doubts bag={bag} setBag={setBag} />} />
      </Routes>
    </Router>
  );
}

export default App;
