import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css';
const url = import.meta.env.VITE_BASE_URL;

type Periodo = {
    id: number;
    nome_periodo: string;
}

export function SelectPeriodo() {

    let { data: periodos } = useFetch<Periodo[]>(`${url}/periodos`, 'get');

    if (!periodos) {
        periodos = [];
    }

    return (
        <select className={styles.selectPeriodo}>
            <option value="default">Selecione um período</option>
            {periodos.map(periodo => {
                return <option key={periodo.id} value={periodo.id}>{periodo.nome_periodo.replace(/\D/gim, '')}</option>
            })}
        </select>
    );
}