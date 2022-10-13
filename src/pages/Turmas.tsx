import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardTurma } from "../components/card/turma/CardTurma";
import { PageButton } from "../components/form/button/PageButton";
import { InputSearch } from "../components/form/input/InputSearch";
import { SelectPeriodo } from "../components/form/select/SelectPeriodo";
import { Header } from "../components/header/Header";
import styles from './Turma.module.css';
const url = import.meta.env.VITE_BASE_URL;

type TurmaType = {
    id: number;
    nome: string;
    descricao: string;
    total_estudantes: number;
}

export function Turmas() {


    const [turmas, setTurmas] = useState<TurmaType[]>([]);
    const [mensagem, setMensagem] = useState("");
    const [openErro, setOpenErro] = useState(false);
    const [openSucesso, setOpenSucesso] = useState(false);

    useEffect(() => {
        axios.get(`${url}/turmas?id_usuario=4`)
            .then((response) => {
                setTurmas(response.data.payload.content)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    function excluirTurma(id: number) {
        axios.delete(`${url}/turmas/${id}`).then(response => {
            setTurmas(turmas.filter(turma => turma.id !== id))
            setOpenSucesso(true)
            setMensagem(response.data.message)
        }).catch(error => {
            setOpenErro(true)
            setMensagem(error.response.data.message)
        })
    }

    return (
        <div className={styles.turmas}>
            <Header title="Turmas" username="Andreia Gomes" />
            <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaTurma"} messagePlaceholder={"Buscar turma por título"} />
                <SelectPeriodo />
                <PageButton nameButton="criar turma" linkButton="/turmas/novo" colorButton="blue" />
            </form>
            <section className={styles.listaTurmas}>
            {turmas.map(turma => {
                return <CardTurma key={turma.id} idTurma={turma.id} nome={turma.nome} descricao={turma.descricao} total_estudantes={turma.total_estudantes} eventoExcluir={excluirTurma}/>
            })}

            </section>
            <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
        </div>
    );
}