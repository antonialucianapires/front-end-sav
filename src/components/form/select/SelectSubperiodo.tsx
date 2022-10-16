import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import styles from './Select.module.css';

const url = import.meta.env.VITE_BASE_URL;

type Subperiodo = {
    id: number;
    nome_subperiodo: string;
    data_inicio: string;
    data_fim: string;
}

type InputSelect = {
    idPeriodo: number;
    eventoInput: any;
    label: string;
}


export function SelectSubperiodo(props: InputSelect) {

    const [subperiodos, setSubperiodos] = useState<Subperiodo[]>([]);

    useEffect(() => {
        fetch(`${url}/periodos/${props.idPeriodo}/subperiodos`)
            .then((response) => response.json())
            .then((data) => {
                setSubperiodos(data.payload)
            })
    }, [props.idPeriodo])


    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        event.preventDefault();

        const optionSelected = event.target.selectedOptions.item(0);

        if (optionSelected) {
            let id = parseInt(optionSelected.id);
            let nome = optionSelected.value;
            props.eventoInput(id, nome)
        }

    }

    return (
        <div>
            <label className={props.label ? styles.label : styles.semLabel}><strong>{props.label}</strong></label>
            <select className={styles.selectPeriodo} onChange={handleInputChange}>
            <option value="default">Selecione um subperíodo</option>
                {subperiodos.map(subperiodo => {
                    return <option key={subperiodo.id} id={subperiodo.id.toString()} value={subperiodo.id}>{subperiodo.nome_subperiodo}</option>
                })}
            </select>
        </div>
    );
}