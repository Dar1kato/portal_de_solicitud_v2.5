"use client"
import React, { useMemo } from 'react';

function Bolsa({ bag, cerrarCarrito, carritoWidth, eliminarDeCarrito, setOpen }) {
  //*------------------------------------------- Funciones -----------------------------------------------------------
  
  // Función para agrupar los elementos en la lista del pedido
  const groupedBag = useMemo(() => {
    // La función reduce los duplicados y los añade como uno mismo, seguido de su cantidad
    return bag.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }, [bag]);

  // Función para eliminar items del carrito
  const handleEliminar = (item) => {
    const index = bag.lastIndexOf(item); // Se encuentra el index del item a eliminar
    if (index !== -1) { // Se elimina el item, si la cantidad de items en el carrito lo permite
      eliminarDeCarrito(index);
    }
  };
  //*-----------------------------------------------------------------------------------------------------------------


  //*------------------------------------------- JSX del componente --------------------------------------------------
  return (
    <div className="carrito" style={{ width: carritoWidth }}>
      <button className="cerrarCarrito" onClick={cerrarCarrito}>Volver</button>
      <h1>Pedido:</h1>
      <div className="contenidoCarrito">
        {/* Se añade cada item del pedido a la lista */}
        {Object.entries(groupedBag).map(([item, count]) => (
          <ul key={item} className="productoEnCarrito">
            <li>
              {item} {count > 1 && <span>x{count}</span>}
              <button className="eliminarDeCarrito" onClick={() => handleEliminar(item)}>-</button>
            </li>
          </ul>
        ))}
      </div>
      <button className='continuarPedidoBoton' onClick={() => setOpen(true)}>Continuar Pedido</button>
    </div>
  );
  //*-----------------------------------------------------------------------------------------------------------------
}

export default Bolsa;

