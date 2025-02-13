import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import './App.css';
import { Toaster } from "sonner";
import Materials from './pages/materiales'; 
import Doubts from './pages/dudas'; 
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

function App() {
  //*--------------------------------------- useState por componente -----------------------------------------------
  // Carrito
  const [bag, setBag] = useState([]);                         // Define el contenido del carrito en una lista     

  // Confirmación
  const [email, setEmail] = useState('');                     // Define el email del usuario

  // Contraseña e inicio de sesion
  const [password, setPassword] = useState('');               // Define la contraseña del usuario
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  });
  
  const [currentPath, setCurrentPath] = useState(() =>        // Define la ruta actual de la página
    localStorage.getItem('lastPath') || '/'
  );

  const TIMEOUT_MINUTES = 15;                                 // Define el tiempo para expirar sesión
  const expirationTime = new Date().getTime() + (TIMEOUT_MINUTES * 60 * 1000);
  localStorage.setItem('expirationTime', expirationTime);

  //*---------------------------------------------------------------------------------------------------------------


  //*------------------------------------------ Funciones y lógicas ------------------------------------------------
  // Manejo de inicio de sesión
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  })

  // Manejo de expiración de sesión
  useEffect(() => {
    const checkSession = () => {
      const expiration = localStorage.getItem('expirationTime');
      if (expiration && new Date().getTime() > parseInt(expiration)) {
        handleLogout();
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [])

  // Función para cambiar el estatus de logIn del usuario
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);

    // Se verifica si los datos del usuario fueron ingresados
    if (email && password) {
      saveLastPath('/materials');
      setCurrentPath('/materials');
    }
  }

  // Función para cambiar el estatus de logOut del usuario
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('lastPath');
    setCurrentPath('/');
  }

  // Función para guardar la ruta más actual
  const saveLastPath = (path) => {
    localStorage.setItem('lastPath', path);
    setCurrentPath(path);
  }
  //*---------------------------------------------------------------------------------------------------------------

  
  //*------------------------------------------ JSX de la Página ---------------------------------------------------

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Tooltip id="logOut" />
      <header className="navbar">
        <div className="titulo">
          <img src="/iberoPueblaImg.png" alt="Ibero Puebla" />
          <h1>Portal de Solicitud de Insumos</h1>
        </div>
        {isLoggedIn && (
          <a
          data-tooltip-id="logOut"
          data-tooltip-content="Cerrar Sesión"
          data-tooltip-place="bottom"
          >
          <button className="logos" onClick={handleLogout}>
            <img className="logout" src="logout.png" alt="Salir"/>
          </button>
          </a>
        )}
      </header>

      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to={currentPath} replace />
            ) : (
              <div className="main">
                <div className="bienvenidaImagen">
                  <img src="fachadaIbero.png" alt="Fachada Ibero" />
                  <div className="bienvenidaTexto">
                    <h1>¡Bienvenido!</h1>
                    <p>Inicia sesión para acceder</p>
                  </div>
                  <form className="logIn" onSubmit={handleLogin}>
                    <label>Correo electrónico:</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                    <label>Contraseña:</label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                    <button type="submit">Iniciar sesión</button>
                  </form>
                </div>
              </div>
            )
          } 
        />

        {/* Rutas protegidas */}
        <Route 
          path="/materials" 
          element={
            isLoggedIn ? (
              <Materials 
                bag={bag} 
                setBag={setBag} 
                onMount={() => saveLastPath('/materials')}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/doubts" 
          element={
            isLoggedIn ? (
              <Doubts 
                bag={bag} 
                setBag={setBag} 
                onMount={() => saveLastPath('/doubts')}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
//*---------------------------------------------------------------------------------------------------------------

export default App;
