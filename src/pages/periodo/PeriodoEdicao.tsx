import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { useFetch } from "../../hooks/useFetch";
import styles from "./PeriodoEdicao.module.css";
import { Alert } from "@mui/material";
import { useState } from "react";

type Subperiodo = {
    id: number;
    nome_subperiodo: string;
    data_inicio: Date;
    data_fim: Date;
}

type PeriodoType = {
    id: number;
    nome_periodo: string;
    tipo_periodo: string;
    data_inicio: Date;
    data_fim: Date;
    status: string;
    subperiodos?: Subperiodo[];

}

export function PeriodoEdicao() {

    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    let { data: periodo } = useFetch<PeriodoType>(`http://localhost:8080/sav/api/periodos/${id}?com_subperiodos=true`, 'get');

    let periodoValue: PeriodoType = {
        id: 0,
        nome_periodo: "",
        tipo_periodo: "",
        data_inicio: new Date(),
        data_fim: new Date(),
        status: ""
    }

    let subperiodos: Subperiodo[] = [];

    if (periodo && periodo.subperiodos) {
        periodoValue = periodo;
        subperiodos = periodo.subperiodos;
    }

    const getValue = (data: any) => {
        return data.value;
    }

    const nomePeriodo = document.querySelector("#nomePeriodo");
    const dataInicioPeriodo = document.querySelector("#dataInicioPeriodo");
    const dataFimPeriodo = document.querySelector("#dataFimPeriodo");


    function atualizarPeriodo() {

        const periodoAtualizacao = {
            nome_periodo: String(getValue(nomePeriodo)),
            tipo_periodo: 2,
            data_inicio: getValue(dataInicioPeriodo),
            data_fim: getValue(dataFimPeriodo)
        };

        axios.put(`http://localhost:8080/sav/api/periodos/${id}`, periodoAtualizacao).then((response) => {
            setOpenSucesso(true)
            setMensagem(response.data.message)

        })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            });
    }

    function atualizarSubperiodo(idSubperiodoAtualizacao: number) {

        let nomeSubperiodo = getValue(document.querySelector(`[data-key="${idSubperiodoAtualizacao}"]`)?.children[0]);
        let dataInicioSubperiodo = getValue(document.querySelector(`[data-key="${idSubperiodoAtualizacao}"]`)?.children[1]);
        let dataFimSubperiodo = getValue(document.querySelector(`[data-key="${idSubperiodoAtualizacao}"]`)?.children[2]);

        axios.put(`http://localhost:8080/sav/api/periodos/subperiodos/${idSubperiodoAtualizacao}`, {

            nome_subperiodo: nomeSubperiodo,
            codigo_periodo: id,
            data_inicio: dataInicioSubperiodo,
            data_fim: dataFimSubperiodo

        }).then((response) => {
            setOpenSucesso(true)
            setMensagem(response.data.message)
        })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            });

    }

    return (
        <div className={styles.periodoEdicao}>
            <Header title={`${periodoValue.nome_periodo}`} appendTitle="Edição" subtitle="Revise e edite o período de avaliação" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key={periodoValue.id} onSubmit={() => navigate("/periodos")}>
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={periodoValue.nome_periodo} edicao={true} />
                <SelectTipoPeriodo nomeTipoAtual={periodoValue.tipo_periodo} />
                <InputText typeInput="date" idInput="dataInicioPeriodo" valueInput={periodoValue.data_inicio} edicao={true} />
                <InputText typeInput="date" idInput="dataFimPeriodo" valueInput={periodoValue.data_fim} edicao={true} />
                <Line />
                <Title valueTitle="Subperíodos" />
                {subperiodos.map((subperiodo) => {

                    return (
                        <div className={styles.listaSubperiodos} key={subperiodo.id} id="subperiodo" onChange={() => atualizarSubperiodo(subperiodo.id)} data-key={subperiodo.id}>
                            <InputText typeInput="text" idInput="nomeSubperiodo" valueInput={subperiodo.nome_subperiodo} edicao={true} />
                            <InputText typeInput="date" idInput="dataInicioSubperiodo" valueInput={subperiodo.data_inicio} edicao={true} />
                            <InputText typeInput="date" idInput="dataFimSubperiodo" valueInput={subperiodo.data_fim} edicao={true} />
                        </div>
                    )
                })}
                <div className={styles.buttons}>
                    <PageButton nameButton="cancelar" linkButton="/periodos" colorButton="red" />
                    <button type="submit" className={styles.botaoAtualizar} onClick={atualizarPeriodo}>salvar</button>
                </div>
                <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => {setOpenSucesso(false)}}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => {setOpenErro(false)}}>{mensagem}</Alert>
            </form>
        </div>
    )

}