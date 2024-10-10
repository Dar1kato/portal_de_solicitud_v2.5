import React from 'react';

function Bolsa({ bag, cerrarCarrito, carritoWidth, eliminarDeCarrito, continuarPedido }) {
  return (
    <div className="carrito" style={{ width: carritoWidth }}>
      <button className="cerrarCarrito" onClick={cerrarCarrito}>Volver</button>
      <h1>Pedido:</h1>
      <div className="contenidoCarrito">
        {bag.map((item, index) => (
          <ul key={index} className="productoEnCarrito">
            <li>{item}
              <button className="eliminarDeCarrito" onClick={() => eliminarDeCarrito(index)}>-</button>
            </li>
          </ul>
        ))}
      </div>
      <button className="continuarPedidoBoton" onClick={continuarPedido}>Continuar con el Pedido</button>
    </div>
  );
}

export default Bolsa;
