import { Alert, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { QuestaoCard } from "../components/card/questao/QuestaoCard";
import { PageButton } from "../components/form/button/PageButton";
import { Header } from "../components/header/Header";
import { useFetch } from "../hooks/useFetch";
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


    let { data: tipos } = useFetch<TipoQuestaoType[]>(`${url}/questoes/tipos`, 'get');

    if (!tipos) {
        tipos = [];
    }

    let tiposQuestao = tipos.map(t => t.id);

    useEffect(() => {
        axios.get(`${url}/questoes?semItens=true&tipos=${tiposQuestao}`)
            .then((response) => {
                setQuestoes(response.data.payload.content)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    const capturaValorInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault()

        const valorInput = event.target.value;

        if (!valorInput) {

            fetch(`${url}/questoes?semItens=true&tipos=${tiposQuestao}`)
                .then((response) => response.json()
                    .then((r) => {
                        setQuestoes(r.payload.content)
                    }));

            return;
        }

        fetch(`${url}/questoes?semItens=true&tipos=${tiposQuestao}&enunciado=${valorInput}`)
            .then((response) => response.json()
                .then((r) => {
                    setQuestoes(r.payload.content)
                }));

    }

    return (
        <div className={styles.questoes}>
            <Header title="Questões" username="Andreia Gomes" subtitle="Gerencie as  questões da plataforma" />
            <form className={styles.formSearch} action="">
                <input className={styles.formInputSearch} name="pesquisaTurma" placeholder="Buscar questões pelo enunciado" onChange={capturaValorInput} />
                <PageButton nameButton="criar questão" linkButton="/questoes/nova" colorButton="blue" />
            </form>
            <div className={styles.opcoesFiltro}>
                <FormGroup aria-label="position" row>
                    {tipos.map(tipo => {
                        return <FormControlLabel key={tipo.id} id={tipo.id.toString()}
                            value="end"
                            control={<Checkbox />}
                            label={tipo.nome.toLowerCase()}
                            labelPlacement="end"
                        />
                    })}
                </FormGroup>
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