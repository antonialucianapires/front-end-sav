import styles from './Periodo.module.css';
import { Header } from "../components/header/Header";
import { InputSearch } from '../components/form/input/InputSearch';
import { SelectPeriodo } from '../components/form/select/SelectPeriodo';
import { CardPeriodo } from '../components/card/infodash/periodo/CardPeriodo';
import { useFetch } from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import axios from 'axios';

type PeriodoType = {
    id: number;
    nome_periodo: string;
    status: string;
};

type ResponseDefaultMessage = {

}


export function Periodo() {

    const api =  "http://localhost:8080/sav/api"

    const [periodos, setPeriodos] = useState<PeriodoType[]>([]);

    useEffect(() => {
        axios.get(`${api}/periodos`)
        .then((response) => {
            setPeriodos(response.data.payload)
        })
        .catch((error) => {
            console.log("erro: " + error.payload)
        })
    }, []);

    

    function deletarPeriodo(id: number) {
       axios.delete(`${api}/periodos/${id}`)
        setPeriodos(periodos.filter(periodo => periodo.id !== id))
        
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
                    return <CardPeriodo key={periodo.id} nome={periodo.nome_periodo} status={periodo.status} idPeriodo={periodo.id} eventoExcluir={deletarPeriodo} />
                })}
            </section>
        </div>
    );
}