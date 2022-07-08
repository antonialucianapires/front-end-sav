import { useFetch } from '../../../hooks/useFetch';
import styles from './SelectPeriodo.module.css'

type Periodo = {
    id: number;
    nome_periodo: string;
}

export function SelectPeriodo() {

    let { data: periodos } = useFetch<Periodo[]>('https://back-end-sav.herokuapp.com/sav/api/periodos', 'get');

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