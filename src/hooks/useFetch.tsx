import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string) {

    const [ data, setData ] = useState<T>();

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setData(response.data);
        });
    });

    return { data };
}