import React, { useMemo, useState } from "react";
import datos from '../datos.json';
import { toast } from "sonner"; // Importamos solo el toast porque el Toaster ya esta en App

// Componentes de la Página
import ListDisplay from "../componentes/display";         // Display
import Dropdown from "../componentes/dropdown";           // Dropdown menu
import Pagination from "../componentes/paginations";      // Paginación
import Cabecera from "../componentes/cabecera";           // Cabecera
import Bolsa from "../componentes/bolsa";                 // Bolsa (también llamado "Carrito")
import Confirmacion from "../componentes/confirmacion";   // Confirmación

function Materials({ bag, setBag, email }) {
  //*--------------------------------------- useState por componente -----------------------------------------------

  // Display
  const [Items, setItems] = useState(Object.values(datos)); // Define los items mostrados en la pagina
  const [query, setQuery] = useState("");                   // Define el query de la busqueda de items

  // Dropdown
  const [selectedValue, setSelectedValue] = useState('');   // Define el valor seleccionado (dropdown)

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);        // Define el numero de la página actual
  const [postPerPage, setPostPerPAge] = useState(16);       // Define la cantidad de items mostrados por página
  const lastPostIndex = currentPage * postPerPage;          // Define el index del ultimo post de la página
  const firstPostIndex = lastPostIndex - postPerPage;       // Define el index del primer post de la página

  // bolsa
  const [carritoWidth, setCarritoWidth] = useState('0');    // Define el tamaño del componente

  // Display
  const [gridType,  setGridtype] = useState(true);          // Define el estilo de mostrado de items

  // Confirmación
  const [userMail,  setUserMail] = useState(email);         // Define el email del usuario
  const [open, setOpen] = useState(false);                  // Define la visibilidad del compoentne

  //*---------------------------------------------------------------------------------------------------------------


  //*------------------------------------------ Funciones y Lógicas ------------------------------------------------

  // Filtro de los items mostrados en la página (por el buscador y por categorias)
  const filtro = useMemo(() => {
    return Items.filter((item) => {
      return (
        item.nombre.toLowerCase().includes(query.toLowerCase()) &&
        (selectedValue === "" || item.categoria === selectedValue)
      );
    }, [Items, query, selectedValue]);
  }, [Items, query, selectedValue]);

  const currentPost = filtro.slice(firstPostIndex, lastPostIndex); // Define el contenido del post actual, con los datos filtrados

  // Función para agregar item al pedido
  function agregarPedido(e, item) {
    e.preventDefault(); // Prevención del caso default
    toast.success(`${item.nombre} agregado al pedido.`, { duration: 2000 }); // Feedback al usuario
    setBag(prev => [...prev, item.nombre]); // Se añade al item al array con la lista de los items en el pedido
  }

  // Función para abrir el carrito
  function abrirCarrito() {
    setCarritoWidth('300px'); // Se cambia la longitud del carrito
  }

  // Función para cerrar el carrito
  function cerrarCarrito() {
    setCarritoWidth('0');  // Se cambia la longitud del carrito
  }

  // Función para eliminar item del carrito
  function eliminarDeCarrito(index) {
    setBag(bag.filter((_, i) => i !== index)); // Se elimina de la lista del carrito el item en el index indicado
  }

  // Función para cambiar el tipo de listado de items
  function toggleListType() {
    gridType ? setGridtype(false) : setGridtype(true); // Se invierte el booleano de gridType, para cambiar al contrario 
  }

  //*----------------------------------------------------------------------------------------------------------------


  //*-------------------------------------------- JSX de la Página --------------------------------------------------
  return (
    <div>
      <Confirmacion bag={bag} email={email} open={open} setOpen={setOpen}/>
      <Cabecera abrirCarrito={abrirCarrito}/>
      
      <Bolsa bag={bag} cerrarCarrito={cerrarCarrito} carritoWidth={carritoWidth} eliminarDeCarrito={eliminarDeCarrito} email={email} open={open} setOpen={setOpen}/>
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
  //*------------------------------------------------------------------------------------------------------------
}

export default Materials;
