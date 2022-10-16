import axios from "axios";
import { useEffect, useState } from "react";
import { CardAvaliacao } from "../components/card/questao/CardAvaliacao";
import { PageButton } from "../components/form/button/PageButton";
import { InputSearch } from "../components/form/input/InputSearch";
import { SelectPeriodo } from "../components/form/select/SelectPeriodo";
import { Header } from "../components/header/Header";
import styles from "./Avaliacoes.module.css";
const url = import.meta.env.VITE_BASE_URL;


type Avaliacao = {
    id: number;
    titulo: string;
    nota_objetivo: number;
    data_hora_inicio: string;
    data_hora_fim: string
}

export function Avaliacoes() {

    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [mensagem, setMensagem] = useState("");
    const [openErro, setOpenErro] = useState(false);
    const [openSucesso, setOpenSucesso] = useState(false);

    useEffect(() => {
        axios.get(`${url}/avaliacoes/ativas`)
            .then((response) => {
                setAvaliacoes(response.data.payload)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    return (
        <div className={styles.turmas}>
            <Header title="Avaliações" username="Andreia Gomes" />
            <form action="" className={styles.formSearch}>
                <InputSearch inputName={"pesquisaAvaliacao"} messagePlaceholder={"Buscar avaliações por nome"} />
                <SelectPeriodo />
                <PageButton nameButton="criar turma" linkButton="/avaliacoes/criacao" colorButton="blue" />
            </form>
            {avaliacoes.map(turma => {
                return <CardAvaliacao key={turma.id} titulo={turma.titulo} />
            })}
        </div>
    );
}