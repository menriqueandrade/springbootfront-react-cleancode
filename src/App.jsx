import React from 'react';
import './App.css';
import { useFetch } from './hook/useFetch';
function App() {
  //utilizamos la variable del hook
  const { data, loading, error, handleCancelRequest } = useFetch("http://localhost:8080/clientController/clientes")

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
          {data && data.map((item, index) => (
            <li key={index}>
              {item.nombre}-
              {item.apellido}-
              {item.producto.nombre}-
              {item.producto.valor}

            </li>
          ))}
        </ul>
      </div>

    </>
  );
}

export default App;
