import React from 'react';

function Pagination({ currentPage, setCurrentPage, postPerPage, lastPostIndex, filtro }) {
  let pages = [];
  const totalPost = Object.keys(filtro).length;

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="paginacion">
      <button onClick={() => setCurrentPage(postPerPage === lastPostIndex ? currentPage : currentPage - 1)}>Anterior</button>
      {pages.map((page, index) => (
        <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
      ))}
      <button onClick={() => setCurrentPage(currentPage === pages[pages.length - 1] ? currentPage : currentPage + 1)}>Siguiente</button>
    </div>
  );
}

export default Pagination;
