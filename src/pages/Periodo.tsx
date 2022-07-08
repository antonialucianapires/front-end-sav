import styles from './Periodo.module.css';
import { Header } from "../components/header/Header";
import { InputSearch } from '../components/form/input/InputSearch';
import { SelectPeriodo } from '../components/form/select/SelectPeriodo';


export function Periodo() {
    return (
        <div className={styles.periodo}>
            <Header title="Períodos" subtitle="Gerencie períodos e subperíodos do processo de avaliação" username="Andreia Gomes" />
            <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaPeriodo"} messagePlaceholder={"Buscar período por título"} />
                <SelectPeriodo />
            </form>
        </div>
    );
}