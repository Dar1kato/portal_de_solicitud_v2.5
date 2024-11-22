import React from 'react';

function ListDisplay({ currentPost, agregarPedido, filtro, gridType, listType }) {
  //*--------------------------------- JSX del componente: Display tipo "Grid" -------------------------------------
  if (gridType) {
    return (
      <div className="grid_display">
      {currentPost.map((item, index) => (
        <div className="grid_displayItem" key={index}>
          <b>{item.nombre}</b><br />
          <small>{item.categoria}</small>
          <img src={item.imagenURL} alt={item.nombre} />
          <p>{item.descripcion}</p>
          <button className="addButton" onClick={(e) => agregarPedido(e, item)}>+</button>
        </div>
      ))}
      {filtro.length === 0 && <p className="noMatch">No se encontraron productos</p>}
    </div>
    );
  //*----------------------------------------------------------------------------------------------------------------


  //*--------------------------------- JSX del componente: Display tipo "Lista" -------------------------------------
  } else {
    return (
      <div className="list_display">
        {currentPost.map((item) => ( // Map de los items por lineas, con su boton correspondiente
          <div className="list_displayItem">
            {/* Se declara el uso de la función agregarPedido() al activar el botón */}
            <img src={item.imagenURL} alt={item.nombre} /> <b>{item.nombre}</b> / <small>{item.categoria}</small> <p>{item.descripcion}</p><button className="addButton" onClick={(e) => agregarPedido(e, item)}>+</button> 
          </div>
        ))}
        {filtro.length === 0 && <p className="noMatch">No se encontraron productos</p>}
      </div>
    )
  }
  //*----------------------------------------------------------------------------------------------------------------

}

export default ListDisplay;
