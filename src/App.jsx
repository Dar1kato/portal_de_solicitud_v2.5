import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from "sonner";
import Materials from './pages/materiales'; 
import Doubts from './pages/dudas'; 


function App() {
  //*--------------------------------------- useState por componente -----------------------------------------------
  // Carrito
  const [bag, setBag] = useState([]);                         // Define el contenido del carrito en una lista     

  // Confirmación
  const [email, setEmail] = useState('');                     // Define el email del usuario

  // Contraseña e inicio de sesion
  const [password, setPassword] = useState('');               // Define la contraseña del usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);        // Define el estado del LogIn del usuario

  //*---------------------------------------------------------------------------------------------------------------


  //*------------------------------------------ Funciones y lógicas ------------------------------------------------
  
  // Función para cambiar el estatus de logIn del usuario
  function handleLogin(e) {
    e.preventDefault();
    setIsLoggedIn(true);
  }

  //*---------------------------------------------------------------------------------------------------------------

  
  //*------------------------------------------ JSX de la Página ---------------------------------------------------

  return (
    <Router>
      <Toaster position="bottom-right" />
      <header className="navbar">
        <div className="titulo">
        <img src="/iberoPueblaImg.png" alt="Ibero Puebla" /><h1>Portal de Solicitud de Insumos</h1>
        </div>
      </header>

      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Materials bag={bag} setBag={setBag} email={email}/>} />
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
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  <label>Contraseña:</label>
                  <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
  //*---------------------------------------------------------------------------------------------------------------
}

export default App;
