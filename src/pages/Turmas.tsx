import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
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

    const { id_usuario } = useParams();

    const [turmas, setTurmas] = useState<TurmaType[]>([]);
    const [mensagem, setMensagem] = useState("");
    const [openErro, setOpenErro] = useState(false);

    useEffect(() => {
        axios.get(`${url}/turmas?id_usuario=6`)
            .then((response) => {
                setTurmas(response.data.payload.content)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    return (
        <div className={styles.turmas}>
            <Header title="Turmas" username="Andreia Gomes" />
            <form className={styles.formSearch} action="">
                <InputSearch inputName={"pesquisaTurma"} messagePlaceholder={"Buscar turma por título"} />
                <SelectPeriodo />
                <PageButton nameButton="criar turma" linkButton="/periodos/novo" colorButton="blue" />
            </form>
            <section className={styles.listaTurmas}>
            {turmas.map(turma => {
                return <CardTurma key={turma.id} nome={turma.nome} descricao={turma.descricao} total_estudantes={turma.total_estudantes}/>
            })}

            </section>
        </div>
    );
}