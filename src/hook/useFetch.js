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
    return { data, loading, error, handleCancelRequest };
}