import { Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { ListFunction } from "../../components/util/ListFunction";
import styles from "./PeriodoCriacao.module.css";
const url = import.meta.env.VITE_BASE_URL;

enum tiposPeriodo {
    BIMESTRAL = "BIMESTRAL",
    TRIMESTRAL = "TRIMESTRAL",
    SEMESTRAL = "SEMESTRAL"
}

type Subperiodo = {
    nome_subperiodo: string;
    data_inicio: string;
    data_fim: string;
}

type Periodo = {
    nome_periodo: string;
    tipo_periodo: number;
    data_inicio: string;
    data_fim: string;
    subperiodos: Subperiodo[];
}

let lista = ListFunction(0);

export function PeriodoCriacao() {

    const [option, setOption] = useState("0");
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    function handleChange(event: any) {
        setOption(event.target.value)
    }

    switch (option) {
        case tiposPeriodo.BIMESTRAL:
            lista = ListFunction(6)
            break;
        case tiposPeriodo.TRIMESTRAL:
            lista = ListFunction(4)
            break;
        case tiposPeriodo.SEMESTRAL:
            lista = ListFunction(2)
            break;
        default:
            lista = ListFunction(0)
    }

    function criarNovoPeriodo() {

        let nomePeriodo = document.querySelector("#nomePeriodo");
        let tipo = capturarTipoPeriodo();
        let dataInicioPeriodo = document.querySelector("#dataInicioPeriodo");
        let dataFimPeriodo = document.querySelector("#dataFimPeriodo");
        let subperiodos = document.querySelector("#subperiodos")?.childNodes;

        const subperiodosLista: Subperiodo[] = [];
        subperiodos?.forEach(item => {

            let inputs = item.childNodes;

            let nomeSubperiodo = String(getValue(inputs[0]));
            let dataInicioSubperiodo = getValue(inputs[1]);
            let dataFimSubperiodo = getValue(inputs[1]);

            const subperiodo: Subperiodo = {
                nome_subperiodo: nomeSubperiodo,
                data_inicio: dataInicioSubperiodo,
                data_fim: dataFimSubperiodo
            }

            subperiodosLista.push(subperiodo);
        });

        if (nomePeriodo && isEmpty(nomePeriodo) === false && dataInicioPeriodo && isEmpty(dataInicioPeriodo) === false && dataFimPeriodo && isEmpty(dataInicioPeriodo) === false && subperiodosLista) {

            const periodo: Periodo = {
                nome_periodo: String(getValue(nomePeriodo)),
                tipo_periodo: Number(tipo),
                data_inicio: String(getValue(dataInicioPeriodo)),
                data_fim: String(getValue(dataFimPeriodo)),
                subperiodos: subperiodosLista
            }

            axios.post(`${url}/periodos`, periodo)
                .then((response) => {
                    setOpenSucesso(true)
                    setMensagem(response.data.message)
                    setTimeout(() => navigate("/periodos"), 4000)

                }).catch((error) => {
                    setOpenErro(true)

                    if (error.response.data.status === 500) {
                        setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
                    } else {
                        setMensagem(error.response.data.message)
                    }

                });
        }

    }


    return (
        <div className={styles.periodoCriacao}>
            <Header title="Período" appendTitle="Criação" subtitle="Criei um novo período escolar e seus respectivos subperíodos" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key="formularioPeriodo">
                <InputText typeInput="text" idInput="nomePeriodo" edicao={true} placeholderInput="escreva o título do período" valueInput="" />
                <div className={styles.informacoesPeriodo}>
                    <SelectTipoPeriodo evento={handleChange} somenteLeitura={false} />
                    <InputText typeInput="date" valueInput="" idInput={"dataInicioPeriodo"} edicao={true} />
                    <InputText typeInput="date" valueInput="" idInput={"dataFimPeriodo"} edicao={true} />
                </div>
                <Line />
                <Title valueTitle="Subperíodos" />
                <div className={styles.listaSubperiodos} id="subperiodos">
                    {lista.map((item, index) => {
                        return (
                            <div className={styles.inputSubperiodo} key={index} id={`${item}`}>
                                <InputText typeInput="text" idInput="nomeSubperiodo" placeholderInput="insira o nome do subperíodo" edicao={true} />
                                <InputText typeInput="date" idInput="dataInicioSubperiodo" valueInput="" edicao={true} />
                                <InputText typeInput="date" idInput="dataFimSubperiodo" valueInput="" edicao={true} />
                            </div>
                        )
                    })}
                </div>
                <div className={lista.length > 0 ? styles.buttons : styles.botaoSalvarNone}>
                    <PageButton nameButton="cancelar" linkButton="/periodos" colorButton="red" />
                    <button type="button" className={styles.botaoSalvar} onClick={criarNovoPeriodo}>salvar</button>
                </div>
            </form>
            <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
        </div>
    )

    function capturarTipoPeriodo() {
        let tiposPeriodo = document.querySelector("select");
        let opcao = tiposPeriodo?.options[tiposPeriodo?.selectedIndex];
        let tipo = opcao?.getAttribute("data-tipo");
        return tipo;
    }
}


const getValue = (data: any) => {
    return data.value;
}

function isEmpty(campo: any) {
    return campo === null || campo === "";
}
