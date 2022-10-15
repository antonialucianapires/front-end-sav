import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css';
const url = import.meta.env.VITE_BASE_URL;

type Periodo = {
    id: number;
    nome_periodo: string;
}

export function SelectPeriodo(props : any) {

    let { data: periodos } = useFetch<Periodo[]>(`${url}/periodos`, 'get');

    if (!periodos) {
        periodos = [];
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        event.preventDefault();

        const optionSelected = event.target.selectedOptions.item(0);

        if (optionSelected) {
            let id = parseInt(optionSelected.id);
            let nome = optionSelected.value;
            props.eventoCapturarPeriodoInput(id, nome)
        }

    }

    return (
        <div>
            <label className={props.label ? styles.label : styles.semLabel}><strong>{props.label}</strong></label>
            <select className={styles.selectPeriodo} onChange={handleInputChange}>
            <option value="default">Selecione um período</option>
            {periodos.map(periodo => {
                return <option key={periodo.id} id={periodo.id.toString()} value={periodo.id}>{periodo.nome_periodo.replace(/\D/gim, '')}</option>
            })}
        </select>
        </div>
    );
}