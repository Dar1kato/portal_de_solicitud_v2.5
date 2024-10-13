import React from 'react';

function Dropdown({ selectedValue, setSelectedValue }) {
  //*---------------------------------------------- Variables ---------------------------------------------------

  // Variable que guarda todas las opciones para el menu desplegable
  //! Esta variable deberá ser obtenida directamente de la base da datos. Para fines de prueba, la lista se mantiene dentro del código
  const options = [
    { value: '', label: '...' },
    { value: 'Ingeniería en Sistemas', label: "Ingeniería en Sistemas" },
    { value: 'Electrónica', label: "Electrónica" },
    { value: 'Química', label: "Química" },
    { value: 'Mecatrónica', label: "Mecatrónica" },
  ];
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
