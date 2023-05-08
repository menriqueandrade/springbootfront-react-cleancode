import React from 'react';
import './App.css';
import { useFetch } from './hook/useFetch';
import { useState } from 'react';

function App() {
  var consultarCliente = "http://localhost:8080/clientController/clientes";
  var consultarProducto = "http://localhost:8080/productController/productos";
  //utilizamos la variable del hook
  const { data, loading, error, handleCancelRequest, deleteResource, guardarCliente,productos } = useFetch(consultarCliente)

  


  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [producto, setProducto] = useState(0);
  // console.log(data);

  //funcion para eliminar
  const handleDelete = (id) => {
    //console.log(id);
    console.log(id);
    deleteResource(id)

    window.location.reload();
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    const nuevoCliente = {
      nombre, apellido, email,
      producto: {
        id: producto
      }
    };
    guardarCliente(nuevoCliente);
    window.location.reload();
  };
  return (
    <>
      <h1>
        Fetch PRO
      </h1>
      <button onClick={handleCancelRequest}>
        Cancelar Respuesta
      </button>
      <div className='card'>
        <ul>
          {error && <li>
            Error : {error}
          </li>}
          {
            loading && <li>
              Cargando...
            </li>
          }
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Producto</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data
                && data.map((item, index) => (

                  <tr>
                    <th key={index}>{item.id}</th>
                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.email}</td>
                    <td>{item.producto.nombre}-{item.producto.valor}</td>
                    <td>

                      <button type="button" className="btn btn-primary" onClick={() => handleDelete(item.id)}>Eliminar</button>
                      <button type="button" className="btn btn-primary">Editar</button>
                    </td>
                  </tr>
                ))


              }
            </tbody>
          </table>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="div">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="producto">Producto</label>
            { <select
              className="form-control"
              id="producto"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
            >
              <option value="">Seleccione</option>
              {productos && productos.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select> }
          </div>

        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Nombre</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Apellido</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Correo</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Producto</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Seleccione</option>
            <option>Producto 1</option>
            <option>Producto 2</option>
            <option>Producto 3</option>
            <option>Producto 4</option>
            <option>Producto 5</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> */}
    </>
  );
}

export default App;
