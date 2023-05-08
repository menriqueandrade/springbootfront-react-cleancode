import {
    useState,
    useEffect
} from 'react';

export function useFetch(url) {
    const [data, setData] = useState();
    //se crea variable para cuando este cargando
    const [loading, setLoading] = useState(true);
    //se crea variable para errores
    const [error, setError] = useState();

    const [controller, setController] = useState(null);

    useEffect(() => {
        getProductos();
        //para rastrear la peticion y controlarla
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(url, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(error);
                }
            })
            .finally(() => setLoading(false));
        return () => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Request Cancelled")
        }

    }
    //borrar Cliente
    const [response, setResponse] = useState();
    const deleteResource = async (id) => {
        console.log("Estoy con el id" + id)
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8080/clientController/cliente/" + id, {
                method: 'DELETE'
            })
            const json = await res.json();

            setResponse(json);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    //Guardar Cliente
    const [responseSave, setResponseSave] = useState();
    const guardarCliente = async (data) => {
        console.log("Estoy con el id" + data)
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8080/clientController/guardar", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json();
            setResponseSave(json);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };
    //Get productos
    const [productos, setProductos] = useState([]);
    const getProductos = async () => {
        try {
            const res = await fetch("http://localhost:8080/productController/productos");
            const data = await res.json();
            // console.log(data);
            setProductos(data);
        } catch (error) {
            console.error(error);
        }
    }



   



    return { data, loading, error, handleCancelRequest, deleteResource, guardarCliente, productos };
}