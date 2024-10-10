import React from 'react';

function ListDisplay({ currentPost, agregarPedido, filtro }) {
  return (
    <div className="display">
      {currentPost.map((item, index) => (
        <div className="displayItem" key={index}>
          <b>{item.nombre}</b><br />
          <small>{item.categoria}</small>
          <img src={item.imagenURL} alt={item.nombre} />
          <button className="addButton" onClick={(e) => agregarPedido(e, item)}>+</button>
        </div>
      ))}
      {filtro.length === 0 && <p className="noMatch">No se encontraron productos</p>}
    </div>
  );
}

export default ListDisplay;
