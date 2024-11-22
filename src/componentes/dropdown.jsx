import React from 'react';

function Dropdown({ selectedValue, setSelectedValue, data }) {
  //*---------------------------------------------- Variables ---------------------------------------------------

  // Variable que guarda todas las opciones para el menu desplegable
  const options = Array.from(new Set(Object.values(data).map(option => option.categoria))) // Se utiliza un set para evitar repeticiones
  .map(categoria => ({
    value: categoria,
    label: categoria
  }));

  // Se añade una opción default para el menu desplegable
  options.unshift({
    value: '',
    label: '...'
  });
  //*--------------------------------------------------------------------------------------------------------------


  //*---------------------------------------------- JSX del componente --------------------------------------------

  return (
    <>
      <b>Filtrar por categoria: </b>
      <select
        className="menuFiltrado"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
  //*--------------------------------------------------------------------------------------------------------------
}

export default Dropdown;
