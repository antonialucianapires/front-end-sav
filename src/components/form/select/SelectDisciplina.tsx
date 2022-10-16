import { useFetch } from "../../../hooks/useFetch";
const url = import.meta.env.VITE_BASE_URL;
import styles from './Select.module.css';

type Disciplina = {
    id: number;
    nome: string;
}


export function SelectDisciplina(props : any) {

    let { data: disciplinas } = useFetch<Disciplina[]>(`${url}/disciplinas`, 'get');

    if (!disciplinas) {
        disciplinas = [];
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        event.preventDefault();

        const optionSelected = event.target.selectedOptions.item(0);

        if (optionSelected) {
            let id = parseInt(optionSelected.id);
            let nome = optionSelected.value;
            props.eventoCapturarDisciplinaInput(id, nome)
        }

    }

    return (
        <div>
            <label className={props.label ? styles.label : styles.semLabel}><strong>{props.label}</strong></label>
            <select className={styles.selectPeriodo} onChange={handleInputChange}>
            <option value="default">Selecione uma disciplina</option>
            {disciplinas.map(disciplina => {
                return <option key={disciplina.id} id={disciplina.id.toString()} value={disciplina.id}>{disciplina.nome}</option>
            })}
        </select>
        </div>
    );

}