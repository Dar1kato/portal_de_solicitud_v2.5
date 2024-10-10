import React from 'react';

function Dropdown({ selectedValue, setSelectedValue }) {
  const options = [
    { value: '', label: '...' },
    { value: 'Ingeniería en Sistemas', label: "Ingeniería en Sistemas" },
    { value: 'Electrónica', label: "Electrónica" },
    { value: 'Química', label: "Química" },
    { value: 'Mecatrónica', label: "Mecatrónica" },
  ];

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
}

export default Dropdown;
