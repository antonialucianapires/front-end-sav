import styles from './Periodo.module.css';
import { Header } from "../components/header/Header";
import { InputSearch } from '../components/form/input/InputSearch';
import { SelectPeriodo } from '../components/form/select/SelectPeriodo';
import { CardPeriodo } from '../components/card/infodash/periodo/CardPeriodo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import { PageButton } from '../components/form/button/PageButton';
const url = import.meta.env.VITE_BASE_URL;

type PeriodoType = {
    id: number;
    nome_periodo: string;
    status: string;
};

export function Periodo() {

    const [periodos, setPeriodos] = useState<PeriodoType[]>([]);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        axios.get(`${url}/periodos`)
            .then((response) => {
                setPeriodos(response.data.payload)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);



    function deletarPeriodo(id: number) {
        axios.delete(`${url}/periodos/${id}`).then(response => {
            setPeriodos(periodos.filter(periodo => periodo.id !== id))
            setOpenSucesso(true)
            setMensagem(response.data.message)
        }).catch(error => {
            setOpenErro(true)
            setMensagem(error.response.data.message)
        })


    }

    return (
        <div className={styles.periodo}>
            <Header title="Períodos" subtitle="Gerencie períodos e subperíodos do processo de avaliação" username="Andreia Gomes" />
            <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaPeriodo"} messagePlaceholder={"Buscar período por título"} />
                <SelectPeriodo />
                <PageButton nameButton="criar período" linkButton="/periodos/novo" colorButton="blue" />
            </form>
            <section className={styles.listaPeriodos}>
                {periodos.map(periodo => {
                    return <CardPeriodo key={periodo.id} nome={periodo.nome_periodo} status={periodo.status} idPeriodo={periodo.id} eventoExcluir={deletarPeriodo} />
                })}
            </section>
            <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
        </div>
    );
}