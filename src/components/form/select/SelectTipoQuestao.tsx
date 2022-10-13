import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import styles from "./SelectTipoQuestao.module.css";
const url = import.meta.env.VITE_BASE_URL;

type TipoQuestaoType = {
    id: number;
    nome: string;
}

export function SelectTipoQuestao(props: any) {

    let { data: tipoQuestao } = useFetch<TipoQuestaoType[]>(`${url}/questoes/tipos`, 'get');

    if (!tipoQuestao) {
        tipoQuestao = []
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        event.preventDefault();

        const optionSelected = event.target.selectedOptions.item(0);

        if (optionSelected) {
            let id = parseInt(optionSelected.id);
            let nome = optionSelected.value;
            props.eventoSelecionado(id, nome)
        }

    }

    return (

        <div>
            <label><b>Tipo</b></label>
            <select tabIndex={props.tabIndex ? props.tabIndex : undefined} aria-disabled={props.somenteLeitura ? props.somenteLeitura : undefined} className={props.somenteLeitura ? styles.readOnly : styles.selectPeriodo} id="tiposQuestao" onChange={handleInputChange} >
                <option value="default">Selecionar</option>
                {tipoQuestao.map(tipo => {
                    if (props.nomeTipoAtual !== undefined && tipo.nome === props.nomeTipoAtual) {
                        return <option id="tipoQuestao" key={tipo.id} value={tipo.nome} defaultValue={tipo.nome} selected={true} data-tipo={tipo.id}>{tipo.nome}</option>
                    }
                    return <option id={tipo.id.toString()} key={tipo.id} value={tipo.nome} data-tipo={tipo.id} >{tipo.nome}</option>
                })}
            </select>

        </div>

    );

}