import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string, method: string, body?: string) {

    const [ data, setData ] = useState<T>();

    switch(method) {
        case 'get':
            useEffect(() => { axios.get(url).then(response => {setData(response.data.payload)}).catch(error => {})}, []);
            break;
        case 'post':
            useEffect(() => { axios.post(url, body).then(response => {setData(response.data.payload)}).catch(error => {})}, []);
            break;
        case 'delete':
            useEffect(() => { axios.delete(url).then((response) => setData(response.data)).catch(error => console.log("Erro delete: " + error))});
            break;
        case '':
            throw new Error('Não consegui proceder com sua solicitação. Tente novamente.')
    }

    
    return { data };
}