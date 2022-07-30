import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css'

type TipoPeriodo = {
    id: number;
    nome: string;
}

type TipoAtual = {
    nomeTipoAtual?: string;
}

export function SelectTipoPeriodo(tipoAtual?: TipoAtual) {

    if (tipoAtual) {

        if (tipoAtual.nomeTipoAtual) {
            return (<select className={styles.selectPeriodo}>
                <option key={tipoAtual.nomeTipoAtual} value={tipoAtual.nomeTipoAtual}>{tipoAtual.nomeTipoAtual}</option>
            </select>)
        } 
    }

    let { data: tipos } = useFetch<TipoPeriodo[]>('http://localhost:8080/sav/api/periodos/tipos', 'get');

    if (!tipos) {
        tipos = [];
    }

    return (
        <select className={styles.selectPeriodo}>
            <option value="default">Tipo período</option>
            {tipos.map(tipo => {
                return <option id="tipoPeriodo" key={tipo.id} value={tipo.id} defaultValue={!tipoAtual ? tipoAtual : ""}>{tipo.nome}</option>
            })}
        </select>
    );
}