import { useFetch } from '../../../hooks/useFetch';
import styles from './Select.module.css';
const url = import.meta.env.VITE_BASE_URL;

type TipoPeriodo = {
    id: number;
    nome: string;
}

export function SelectTipoPeriodo(props: any) {

    let { data: tipos } = useFetch<TipoPeriodo[]>(`${url}/periodos/tipos`, 'get');

    if (!tipos) {
        tipos = [];
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
        <div className={styles.divSelecionarPeriodo}>
            <label><b>{props.label}</b></label>
            <select tabIndex={props.tabIndex ? props.tabIndex : undefined} aria-disabled={props.somenteLeitura ? props.somenteLeitura : undefined} className={props.somenteLeitura ? styles.readOnly : styles.selectPeriodo} id="tiposPeriodo" onChange={handleInputChange}>
            <option value="default">Tipo período</option>
            {tipos.map(tipo => {
                if (props.nomeTipoAtual !== undefined && tipo.nome === props.nomeTipoAtual) {
                    return <option id={tipo.id.toString()} key={tipo.id} value={tipo.nome} defaultValue={tipo.nome}  selected={true} data-tipo={tipo.id}>{tipo.nome}</option>
                }
                return <option id={tipo.id.toString()} key={tipo.id} value={tipo.nome} data-tipo={tipo.id}>{tipo.nome}</option>
            })}
        </select>
        </div>
    );
}