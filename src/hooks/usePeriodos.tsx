import { useEffect, useState } from "react";
const url = import.meta.env.VITE_BASE_URL;

export interface Periodo {
    id: number;
    nome_periodo: string;
}

export const usePeriodos = () => {
    const [periodos, setPeriodos] = useState<Periodo[]>([]);

    useEffect(() => {

        fetch(`${url}/periodos`)
            .then((response) => response.json())
            .then((data) => setPeriodos(data));

    }, []);

    return periodos;
}