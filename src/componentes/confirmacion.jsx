"use client"
import React, { useState } from "react";
import { toast } from "sonner";

function Confirmacion({ bag, email, open, setOpen }) {
  const [sent, setSent] = useState(false);
  const [nombre, setNombre] = useState("");
  const [numControl, setNumControl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateEmailHTML = () => {
    const itemsList = bag.map(item => `<li>${item}</li>`).join('');
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Confirmación de Pedido</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Número de Control:</strong> ${numControl}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <h3>Artículos Solicitados:</h3>
        <ul>${itemsList}</ul>
      </div>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: `Solicitud de Material - ${nombre}`,
          text: `Solicitud de material por ${nombre} (${numControl})`,
          html: generateEmailHTML()
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('¡Pedido enviado correctamente!');
        setSent(true);
        setOpen(false);
      } else {
        throw new Error(data.message || 'Error al enviar el pedido');
      }
    } catch (err) {
      setError(`Error al enviar el pedido: ${err.message}`);
      toast.error('Error al enviar el pedido');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;
  
  return (
    <div className="confirmacion">
      <button 
        onClick={() => setOpen(false)} 
        className="cerrarConfirmar"
        type="button"
      >
        x
      </button>
      
      <h1>Confirmación del Pedido</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre: </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numControl">Número de Control: </label>
          <input
            id="numControl"
            type="text"
            value={numControl}
            onChange={(e) => setNumControl(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Correo: </label>
          <span>{email}</span>
        </div>

        <hr />
        
        <h3>Pedido:</h3>
        <div className="pedidoFinal">
          <ul>
            {bag.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <hr />
        
        <i className="disclaimer">
          Al solicitar material a la institución, estás automáticamente aceptando los términos y condiciones de préstamos
        </i>

        <button 
          className="confirmarPedido" 
          type="submit"
          disabled={isLoading || !nombre || !numControl}
        >
          {isLoading ? 'Enviando...' : 'Confirmar Pedido'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Confirmacion;

