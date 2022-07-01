import styles from './SelectPeriodo.module.css'

const periodos = [{
    id: 1,
    nome: "2020"
},
{
    id: 2,
    nome: "2021"
}];

export function SelectPeriodo() {
    return(
            <select className={styles.selectPeriodo}>
                <option value="default">Selecione um período</option>
                {periodos.map(periodo => {
                    return <option value={periodo.nome}>{periodo.nome}</option>
                })}
            </select>
    );
}