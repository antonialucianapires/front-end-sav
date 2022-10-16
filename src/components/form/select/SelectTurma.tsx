import { Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
const url = import.meta.env.VITE_BASE_URL;



type Turma = {
    id: number;
    nome: string;
}

type InputSelect = {
    idPeriodo: number;
    eventoInput: any;
}


export function SelectTurma(props: InputSelect) {

    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [idsTurmas, setIdsTurmas]  = useState<Number[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let id = parseInt(event.target.id);

        if(event.target.checked) {
            idsTurmas.push(id);
            setIdsTurmas(idsTurmas);
        } else {
            if(idsTurmas.find(id => id === id)) {
                let index = idsTurmas.indexOf(id);
                idsTurmas.splice(index, 1);

                setIdsTurmas(idsTurmas)
            }
        }

        props.eventoInput(idsTurmas)
        
      };

    useEffect(() => {
        //TODO: ajustar consulta deturma p n pedir usuario obrigatorio
        fetch(`${url}/turmas?id_usuario=1`)
            .then((response) => response.json())
            .then((data) => {
                setTurmas(data.payload.content)
            })
    }, [])

    return (
        <FormGroup>
            {turmas.map(turma => {
                return <FormControlLabel control={<Checkbox onChange={handleChange} id={turma.id.toString()} />} label={turma.nome} />
            })}
        </FormGroup>
    );

}