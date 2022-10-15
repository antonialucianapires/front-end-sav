import { Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectPeriodo } from "../../components/form/select/SelectPeriodo";
import { Header } from "../../components/header/Header";
import styles from "./TurmaCriacao.module.css";
const url = import.meta.env.VITE_BASE_URL;

export function TurmaCriacao() {

    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();
    const [nomeTurma, setNomeTurma] = useState("");
    const [descricaoTurma, setDescricaoTurma] = useState("");
    const [codigoPeriodo, setCodigoPeriodo] = useState(0);

    function capturarNomeTurma(nomeTurma: string) {
        setNomeTurma(nomeTurma)
    }

    function capturarDescricaoTurma(descricaoTurma: string) {
        setDescricaoTurma(descricaoTurma)
    }

    function capturarPeriodoSelecionado(id: number) {
        setCodigoPeriodo(id)
    }

    function criarTurma() {


        let turma = {
            nome: nomeTurma,
            descricao: descricaoTurma,
            id_periodo: codigoPeriodo
        }

        axios.post(`${url}/turmas`, turma)
            .then((response) => {

                setOpenSucesso(true)
                setMensagem("Turma atualizada com sucesso!")

                if (response.data.payload) {
                    let idTurma = response.data.payload.id;

                    setTimeout(() => navigate(`/turmas/${idTurma}/edicao`), 2000)
                }


            }).catch((error) => {
                setOpenErro(true)
                if (error.response.data.httpCode === 500) {
                    setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
                } else {

                    setMensagem(error.response.data.message)
                }

            });
    }

    return (<div className={styles.turmaCriacao}>
        <Header title={"Turma"} appendTitle="criação" subtitle="Crie uma nova turma para aplicar avaliações" username="Andreia Gomes" />
        <form className={styles.formularioTurma}>
            <InputText typeInput="text" idInput="nomeTurma" valueInput={nomeTurma} edicao={true} styleName={styles.itemFormulario} label="Nome" eventoCapturarTextoInput={capturarNomeTurma} placeholderInput="Escreva um nome para esta turma" />
            <SelectPeriodo label="Período" eventoCapturarPeriodoInput={capturarPeriodoSelecionado} />
            <InputText typeInput="text" idInput="descricaoTurma" valueInput={descricaoTurma} edicao={true} styleName={styles.itemFormulario} label="Descrição" eventoCapturarTextoInput={capturarDescricaoTurma} placeholderInput="Descreva esta turma" />
        </form>
        <div className={styles.listaBotoes}>
            <PageButton nameButton="cancelar" linkButton="/turmas" colorButton="red" />
            <button type="button" className={styles.botaoAtualizar} onClick={criarTurma}>finalizar</button>
        </div>
        <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
        <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
    </div>)

}