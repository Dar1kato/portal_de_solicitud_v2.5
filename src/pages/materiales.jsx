import React, { useMemo, useState } from "react";
import datos from '../datos.json';
import { toast } from "sonner"; // Importaamos solo el toast porque el Toaster ya esta en App
import ListDisplay from "../componentes/display";
import Dropdown from "../componentes/dropdown";
import Pagination from "../componentes/paginations";
import Cabecera from "../componentes/cabecera";
import Bolsa from "../componentes/bolsa";

function Materials({ bag, setBag, email }) {
  const [Items, setItems] = useState(Object.values(datos));
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPAge] = useState(16);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [carritoWidth, setCarritoWidth] = useState('0');
  const [gridType,  setGridtype] = useState(true);
  const [userMail,  setUserMail] = useState(email);

  const filtro = useMemo(() => {
    return Items.filter((item) => {
      return (
        item.nombre.toLowerCase().includes(query.toLowerCase()) &&
        (selectedValue === "" || item.categoria === selectedValue)
      );
    }, [Items, query, selectedValue]);
  }, [Items, query, selectedValue]);

  const currentPost = filtro.slice(firstPostIndex, lastPostIndex);

  function agregarPedido(e, item) {
    e.preventDefault();
    toast.success(`${item.nombre} agregado al pedido.`, { duration: 2000 });
    setBag(prev => [...prev, item.nombre]);
  }

  function abrirCarrito() {
    setCarritoWidth('300px');
    console.log("La funcion sirve");
  }

  function cerrarCarrito() {
    setCarritoWidth('0');
  }

  function eliminarDeCarrito(index) {
    setBag(bag.filter((_, i) => i !== index));
  }

  function continuarPedido() {
    alert("El Dev aún no implementa esta función :(");
    console.log(bag);
  }

  function handleLogOut(e) {
    e.preventDefault();
    window.location.href = '/app';
  }

  function toggleListType() {
    gridType ? setGridtype(false) : setGridtype(true);
  }

  console.log(userMail);
  return (
    <div>
      <Cabecera abrirCarrito={abrirCarrito} hanldeLogOut={handleLogOut}/>
      <Bolsa bag={bag} cerrarCarrito={cerrarCarrito} carritoWidth={carritoWidth} eliminarDeCarrito={eliminarDeCarrito} continuarPedido={continuarPedido} />
      <div className="buscador">
        <form className="buscar_texto" type="search">
          <input placeholder="Buscar..." type="text" onChange={(e) => setQuery(e.target.value)} />
        </form>
        <br />
        <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        <img src={gridType ? "/list.png" : "/grid.png"} className="toggle" onClick={toggleListType}/>
      </div>

      <br />

      {/* Aqui estan los materiales*/}
      <ListDisplay currentPost={currentPost} agregarPedido={agregarPedido} filtro={filtro} gridType={gridType}/>

      {/* Aqui esta la paginación */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postPerPage={postPerPage} lastPostIndex={lastPostIndex} filtro={filtro} />
      <footer></footer>
    </div>
  );
}

export default Materials;
