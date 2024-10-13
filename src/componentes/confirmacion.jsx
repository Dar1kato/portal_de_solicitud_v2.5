"use client"
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function Confirmacion({ bag, email, open, setOpen }) {
  //*--------------------------------------- useStates del Componente ---------------------------------------------

  const [sent, setSent] = useState(false);              // Define el estatus del envio
  const [nombre, setNombre] = useState("");             // Define el nombre del solicitante
  const [numControl, setNumControl] = useState();       // Define el numero de control del solicitante
  const [isLoading, setIsLoading] = useState(false);    // Define el estatus de carga del proceso de envio 
  const [error, setError] = useState(null);             // Define el error en el proceso de envio

  //*---------------------------------------------------------------------------------------------------------------

  //*------------------------------------------ Funciones y Lógicas ------------------------------------------------

  // Función para enviar un Correo
  const handleSubmit = async () => {
    setIsLoading(true); // Condicion inicial del estatus de carga inicializado a verdadero
    setError(null);

    // Intento de envío de correo
    try {
      // Inicio de la secuencia de Envio
      console.log("Inicio de secuencia de Envio");

      // LLamada al metodo POST para realizar el envio con los datos personalizados del correo
      const response = await axios.post('http://localhost:4000/send-email', {

        // Datos personalizados del correo
        bag,
        email,
        nombre,
        numControl
      });

      // Se imprime la respuesta del servidor, continua el proceso de envio
      console.log('Respuesta del servidor:', response.data);
      console.log("Envio del correo en proceso");

    // Catch de errores
    } catch (error) {

      // Se imprime el error
      console.error('Error al enviar el correo:', error);
      setError('Hubo un error al enviar el correo. Por favor, intenta de nuevo.');

      // Feedback al usuario
      toast.warning("Error al enviar el correo, intente de nuevo")

    // Finalización del Intento de envío
    } finally {
      // Reinicio del estatus de carga
      setIsLoading(false);

      console.log("Secuencia de Envio Terminada!")

      // Feedback al usuario
      toast.success("¡Pedido Solicitado Exisosamente!")
    }
  };
  //*------------------------------------------------------------------------------------------------------------------

  //*-------------------------------------------- JSX del componente --------------------------------------------------
  return (
    // Condicional que lee el estado del componente: visible
    open ? 
    <div className="confirmacion">
      <button onClick={() => setOpen(false)} className="cerrarConfirmar">x</button>
      <h1>Confirmación del Pedido</h1>
        <form>
          <label>Nombre: </label>
          <input type="Nombre" name="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
          <br />
          <label>Numero de Control: </label>
          <input type="numControl" name="Numero de Control" value={numControl} onChange={(e) => setNumControl(e.target.value)} required/>
          <br />
          <label>Correo: </label>{email}
          <hr />
          <h3>Pedido:</h3>
          <div className="pedidoFinal">
            {bag.map((item) => (
              <ul>
                <li>{item}</li>
              </ul>
            ))}
          </div>
          <hr />
          <i class="disclaimer">Al solicitar material a la institución, estás automaticamente accediendo a los terminos y condiciones de prestamos</i>
          <button className="confirmarPedido" onClick={handleSubmit} disabled={isLoading || !nombre || !numControl}>
              {isLoading ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </form>
    </div>

    // Condicional que lee el estado del componente: oculto
    : null
  )
  //*---------------------------------------------------------------------------------------------------------------
}

export default Confirmacion;

