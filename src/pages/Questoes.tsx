import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuestaoCard } from "../components/card/questao/QuestaoCard";
import { PageButton } from "../components/form/button/PageButton";
import { CheckboxTipoQuestao } from "../components/form/select/CheckboxTipoQuestao";
import { Header } from "../components/header/Header";
import styles from "./Questoes.module.css";
const url = import.meta.env.VITE_BASE_URL;


type TipoQuestaoType = {
    id: number;
    nome: string;
}

type QuestaoType = {
    id: number;
    titulo: string;
    enunciado: string;
    tipoQuestao: TipoQuestaoType;
    nivelQuestao: string;
}

export function Questoes() {

    const [questoes, setQuestoes] = useState<QuestaoType[]>([]);
    const [openErro, setOpenErro] = useState(false);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [text, setText] = useState("");
    const [tipo, setTipo] = useState<number[]>([]);

    useEffect(() => {

        axios.get(`${url}/questoes?semItens=true&enunciado=${text}&tipos=${tipo}`)
            .then((response) => {
                setQuestoes(response.data.payload.content)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })

    }, [text, tipo]);


    function filtrarTipoQuestao(idTipo: number) {
        if (tipo.length === 0) {
            setTipo([idTipo])
        } else {
            tipo.push(idTipo);
            setTipo(tipo)
        }

    }

    return (
        <div className={styles.questoes}>
            <Header title="Questões" username="Andreia Gomes" subtitle="Gerencie as  questões da plataforma" />
            <form className={styles.formSearch} action="">
                <input className={styles.formInputSearch} value={text} name="pesquisaTurma" placeholder="Buscar questões pelo enunciado" onChange={(search) => setText(search.target.value)} />
                <PageButton nameButton="criar questão" linkButton="/questoes/criacao" colorButton="blue" />
            </form>
            <div className={styles.opcoesFiltro}>
                <CheckboxTipoQuestao eventoFiltrarTipo={filtrarTipoQuestao} />
            </div>
            <section className={styles.listaQuestoes}>
                {questoes.map(questao => {
                    return <QuestaoCard titulo={questao.titulo} enunciado={questao.enunciado} idQuestao={questao.id} key={questao.id} />
                })}
            </section>
            <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
        </div>


    );
}