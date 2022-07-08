import { InputSearch } from "../components/form/input/InputSearch";
import { SelectPeriodo } from "../components/form/select/SelectPeriodo";
import { Header } from "../components/header/Header";
import styles from './Relatorio.module.css';

export function Relatorio() {

    return (
        <div className={styles.relatorio}>
            <Header title="Relatórios" subtitle="Pesquise o nome do relatório e selecione os períodos para realizar o download" username="Andreia Gomes" />
               <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaRelatorio"} messagePlaceholder={"Buscar relatório por título"} />
                <SelectPeriodo />
               </form>
        </div>
    );
}