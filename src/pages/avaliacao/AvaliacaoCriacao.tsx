import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectDisciplina } from "../../components/form/select/SelectDisciplina";
import { SelectPeriodo } from "../../components/form/select/SelectPeriodo";
import { SelectSubperiodo } from "../../components/form/select/SelectSubperiodo";
import { SelectTurma } from "../../components/form/select/SelectTurma";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { useFetch } from "../../hooks/useFetch";
import styles from "./AvaliacaoCriacao.module.css";
const url = import.meta.env.VITE_BASE_URL;


type Subperiodo = {
    id: number;
    nome_subperiodo: string;
    data_inicio: string;
    data_fim: string;
}

export function AvaliacaoCriacao() {

    const [tituloAvaliacao, setTituloAvaliacao] = useState("");
    const [notaObjetivo, setNotaObjetivo] = useState(0.0);
    const [idPeriodo, setIdPeriodo] = useState(0);
    const [idSubperiodo, setIdSubperiodo] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [turmas, setTurmas] = useState<Number[]>([]);
    const [idDisciplina, setIdDisciplina] = useState(0);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();


    function capturarNomeAvaliacao(nomeAvaliacao: string) {
        setTituloAvaliacao(nomeAvaliacao)
    }

    function capturarPeriodoSelecionado(id: number) {
        setIdPeriodo(id)
    }

    function capturarSubperiodoSelecionado(id: number) {
        setIdSubperiodo(id)
    }

    function capturarDataInicio(dataInicio: string) {
        setDataInicio(dataInicio)
    }

    function capturarDataFim(dataFim: string) {
        setDataFim(dataFim)
    }

    function capturarNotaObjetivo(notaObjetivo: number) {
        setNotaObjetivo(notaObjetivo)
    }

    function capturarDisciplina(idDisciplina: number) {
        setIdDisciplina(idDisciplina)
    }

    function capturarTurmasSelecionadas(turmas: number[]) {
        setTurmas(turmas)
    }

    function criarAvaliacao() {
        let avaliacao = {
            nota_objetivo: notaObjetivo,
            titulo: tituloAvaliacao,
            id_subperiodo: idSubperiodo,
            data_hora_inicio: new Date(dataInicio).toLocaleString(),
            data_hora_fim: new Date(dataFim).toLocaleString(),
            usuario_criacao: 1,
            turmas: turmas,
            id_disciplina: idDisciplina
        }

        axios.post(`${url}/avaliacoes`, avaliacao)
        .then((response) => {
            
            if (response.data.payload) {
                
                let idTurma = response.data.payload.id;

                setTimeout(() => navigate(`/avaliacoes/${idTurma}/questoes`), 2000)
            }
                                

        }).catch((error) => {
            setOpenErro(true)

            if (error.response.data.status === 500) {
                setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
            } else {
                setMensagem(error.response.data.message)
            }

        });
    }


    return (<div className={styles.avaliacaoCriacao}>
        <Header title="Avaliações" appendTitle="criação" username="Andreia Gomes" subtitle="Crie uma nova avaliação para as turmas ativas" />
        <form className={styles.formularioTurma}>
            <div className={styles.formsPeriodo}>
                <InputText typeInput="text" idInput="nomeAvaliacao" valueInput={tituloAvaliacao} edicao={true} styleName={styles.itemFormulario} label="Nome" eventoCapturarTextoInput={capturarNomeAvaliacao} placeholderInput="Escreva o título da avaliação. Exemplo: Turma 000 - Avaliação - Disciplina" />
                <SelectPeriodo label="Período" eventoCapturarPeriodoInput={capturarPeriodoSelecionado} onChange={capturarSubperiodoSelecionado} />
                <SelectSubperiodo label="Subperíodo" eventoInput={capturarSubperiodoSelecionado} idPeriodo={idPeriodo} />
            </div>
            <div className={styles.formsPeriodo}>
                <SelectDisciplina label="Disciplina" eventoCapturarDisciplinaInput={capturarDisciplina} />
                <InputText typeInput="datetime-local" pattern="yyyy-MM-dd HH:mm:ss" idInput="dataInicio" valueInput={dataInicio} edicao={true} styleName={styles.itemFormulario} label="Data início" eventoCapturarTextoInput={capturarDataInicio} />
                <InputText typeInput="datetime-local" pattern="yyyy-MM-dd HH:mm:ss" idInput="dataInicio" valueInput={dataInicio} edicao={true} styleName={styles.itemFormulario} label="Data fim" eventoCapturarTextoInput={capturarDataFim} />
                <InputText typeInput="number" idInput="nomeAvaliacao" valueInput={tituloAvaliacao} edicao={true} styleName={styles.itemFormulario} label="Nota objetivo" eventoCapturarTextoInput={capturarNotaObjetivo} placeholderInput="0.0" />
            </div>
            <Line />
            <label><strong>Selecione as turmas elegíveis a esta avaliação: </strong></label>
            <SelectTurma idPeriodo={0} eventoInput={capturarTurmasSelecionadas} />
        </form>
        <div className={styles.buttons}>
            <PageButton nameButton="cancelar" linkButton="/avaliacoes" colorButton="red" />
            <button type="button" className={styles.botaoSalvar} onClick={criarAvaliacao}>continuar</button>
        </div>
        <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
        <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
    </div>)
}