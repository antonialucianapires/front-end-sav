import styles from './Periodo.module.css';
import { Header } from "../components/header/Header";
import { InputSearch } from '../components/form/input/InputSearch';
import { SelectPeriodo } from '../components/form/select/SelectPeriodo';
import { CardPeriodo } from '../components/card/infodash/periodo/CardPeriodo';
import { useFetch } from '../hooks/useFetch';

type Periodo = {
    id: number;
    nome_periodo: string;
    status: string;
};


export function Periodo() {

    let { data: periodos } = useFetch<Periodo[]>('https://back-end-sav.herokuapp.com/sav/api/periodos', 'get');

    if (!periodos) {
        periodos = [];
    }

    return (
        <div className={styles.periodo}>
            <Header title="Períodos" subtitle="Gerencie períodos e subperíodos do processo de avaliação" username="Andreia Gomes" />
            <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaPeriodo"} messagePlaceholder={"Buscar período por título"} />
                <SelectPeriodo />
            </form>
            <section className={styles.listaPeriodos}>
                {periodos.map(periodo => {
                    return <CardPeriodo key={periodo.id} nome={periodo.nome_periodo} status={periodo.status} />
                })}
            </section>
        </div>
    );
}