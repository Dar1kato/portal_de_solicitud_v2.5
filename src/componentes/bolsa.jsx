import React, { useMemo } from 'react';

function Bolsa({ bag, cerrarCarrito, carritoWidth, eliminarDeCarrito, continuarPedido }) {

  // Agrupación de elementos en la bolsa
  //* Creditos a Claude.ai
  const groupedBag = useMemo(() => {
    return bag.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }, [bag]);

  // Función para eliminar correctamente elementos agrupados
  const handleEliminar = (item) => {
    const index = bag.lastIndexOf(item);
    if (index !== -1) {
      eliminarDeCarrito(index);
    }
  };

  return (
    <div className="carrito" style={{ width: carritoWidth }}>
      <button className="cerrarCarrito" onClick={cerrarCarrito}>Volver</button>
      <h1>Pedido:</h1>
      <div className="contenidoCarrito">
        {/* Mapeado de los productos agregados a la lista, como elementos independientes en la lista del pedido */}
        {Object.entries(groupedBag).map(([item, count]) => (
          <ul key={item} className="productoEnCarrito">
            <li>
              {item} {count > 1 && <span>x{count}</span>}
              <button className="eliminarDeCarrito" onClick={() => handleEliminar(item)}>-</button>
            </li>
          </ul>
        ))}
      </div>
      <button className="continuarPedidoBoton" onClick={continuarPedido}>Continuar con el Pedido</button>
    </div>
  );
}

export default Bolsa;
