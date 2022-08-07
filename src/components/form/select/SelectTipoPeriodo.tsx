import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css'

type TipoPeriodo = {
    id: number;
    nome: string;
}

export function SelectTipoPeriodo(props: any) {

    let { data: tipos } = useFetch<TipoPeriodo[]>('http://localhost:8080/sav/api/periodos/tipos', 'get');

    if (!tipos) {
        tipos = [];
    }

    return (
        <select tabIndex={props.tabIndex ? props.tabIndex : undefined} aria-disabled={props.somenteLeitura ? props.somenteLeitura : undefined} className={props.somenteLeitura ? styles.readOnly : styles.selectPeriodo} id="tiposPeriodo" onChange={props.evento}>
            <option value="default">Tipo período</option>
            {tipos.map(tipo => {
                if (props.nomeTipoAtual !== undefined && tipo.nome === props.nomeTipoAtual) {
                    return <option id="tipoPeriodo" key={tipo.id} value={tipo.nome} defaultValue={tipo.nome}  selected={true}>{tipo.nome}</option>
                }
                return <option id="tipoPeriodo" key={tipo.id} value={tipo.nome}>{tipo.nome}</option>
            })}
        </select>
    );
}