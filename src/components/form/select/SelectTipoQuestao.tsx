import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
const url = import.meta.env.VITE_BASE_URL;

type TipoQuestaoType = {
    id: number;
    nome: string;
}

export function SelectTipoQuestao(props : any) {


    let { data: tipoQuestao } = useFetch<TipoQuestaoType[]>(`${url}/questoes/tipos`, 'get');

    if (!tipoQuestao) {
        tipoQuestao = []
    }

    return (
        <FormGroup aria-label="position" row>
            {tipoQuestao.map(tipo => {
                return <FormControlLabel key={tipo.id} id={tipo.id.toString()} data-group-name={"tipos-questao"}
                    value="end"
                    control={<Checkbox onChange={() => props.eventoFiltrarTipo(tipo.id)}  />}
                    label={tipo.nome.toLowerCase()}
                    labelPlacement="end"
                    

             />
            })}
        </FormGroup>
    )
}