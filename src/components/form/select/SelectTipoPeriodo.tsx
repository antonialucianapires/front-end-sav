import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css'

type TipoPeriodo = {
    id: number;
    nome: string;
}

type TipoAtual = {
    nomeTipoAtual: string;
}

export function SelectTipoPeriodo(tipoAtual?: TipoAtual) {

    if (tipoAtual) {

        if (tipoAtual.nomeTipoAtual) {
            return (<select className={styles.selectPeriodo}>
                <option key={tipoAtual.nomeTipoAtual} value={tipoAtual.nomeTipoAtual}>{tipoAtual.nomeTipoAtual}</option>
            </select>)
        } else {
            return (<select className={styles.selectPeriodo}>
                <option key="" value="0"></option>
            </select>)
        }
    }

    let { data: tipos } = useFetch<TipoPeriodo[]>('https://back-end-sav.herokuapp.com/sav/api/periodos/tipos', 'get');

    if (!tipos) {
        tipos = [];
    }

    return (
        <select className={styles.selectPeriodo}>
            <option value="default">Tipo período</option>
            {tipos.map(tipo => {
                return <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
            })}
        </select>
    );
}