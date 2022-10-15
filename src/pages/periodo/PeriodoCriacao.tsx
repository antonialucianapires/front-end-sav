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

type SubperiodoDto = {
    id: number;
    nome_subperiodo: string;
    data_inicio: string;
    data_fim: string;
}

let lista = ListFunction(0);

export function PeriodoCriacao() {

    let indexSubperiodo = 0;
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [valorNomePeriodo, setValorNomePeriodo] = useState("");
    const [nomeTipoPeriodo, setNomeTipoPeriodo] = useState("");
    const [codigoTipoPeriodo, setCodigoTipoPeriodo] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [subperiodosLista, setSubperiodosLista] = useState<SubperiodoDto[]>([]);


    function handleValorTitulo(nomePeriodo: string) {
        setValorNomePeriodo(nomePeriodo);
    }

    function handleTipoPeriodo(id: string, nome: string) {
        setCodigoTipoPeriodo(parseInt(id))
        setNomeTipoPeriodo(nome)
        setSubperiodosLista([])
    }

    function handleDataInicio(dataInicio: string) {
        setDataInicio(dataInicio)
    }

    function handleDataFim(dataFim: string) {
        setDataFim(dataFim)
    }

    function handleNomeSubperiodo(valorInput: string, id: string) {


        let sub = {
            id: parseInt(id),
            nome_subperiodo: valorInput,
            data_inicio: "",
            data_fim: ""
        }

        let subAtual = subperiodosLista.find(o => o.id === parseInt(id))

        if (subAtual) {

            sub = {
                id: subAtual.id,
                nome_subperiodo: valorInput,
                data_inicio: subAtual.data_inicio,
                data_fim: subAtual.data_fim
            }

            let index = subperiodosLista.indexOf(subAtual);
            subperiodosLista.splice(index, 1);
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }


        } else {
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }
        }
    }

    function handleDataInicioSubperiodo(valorInput: string, id: string) {

        let sub = {
            id: parseInt(id),
            nome_subperiodo: "",
            data_inicio: valorInput,
            data_fim: ""
        }

        let subAtual = subperiodosLista.find(o => o.id === parseInt(id))

        if (subAtual) {

            sub = {
                id: subAtual.id,
                nome_subperiodo: subAtual.nome_subperiodo,
                data_inicio: valorInput,
                data_fim: subAtual.data_fim
            }

            let index = subperiodosLista.indexOf(subAtual);
            subperiodosLista.splice(index, 1);
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }


        } else {
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }
        }

    }

    function handleDataFimSubperiodo(valorInput: string, id: string) {

        let sub = {
            id: parseInt(id),
            nome_subperiodo: "",
            data_inicio: "",
            data_fim: valorInput
        }

        let subAtual = subperiodosLista.find(o => o.id === parseInt(id))

        if (subAtual) {

            sub = {
                id: subAtual.id,
                nome_subperiodo: subAtual.nome_subperiodo,
                data_inicio: subAtual.data_inicio,
                data_fim: valorInput
            }

            let index = subperiodosLista.indexOf(subAtual);
            subperiodosLista.splice(index, 1);
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }

        } else {
            if (sub.id !== NaN) {
                subperiodosLista.push(sub)
            }
        }

        console.log(subperiodosLista.filter(s => s.id.valueOf()))
    }


    const navigate = useNavigate();

    switch (nomeTipoPeriodo) {
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

        const periodo: Periodo = {
            nome_periodo: valorNomePeriodo,
            tipo_periodo: codigoTipoPeriodo,
            data_inicio: dataInicio,
            data_fim: dataFim,
            subperiodos: subperiodosLista.map(sub => {
                return {
                    nome_subperiodo: sub.nome_subperiodo,
                    data_inicio: sub.data_inicio,
                    data_fim: sub.data_fim
                }
            })
        }

        console.log(periodo)

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


    return (
        <div className={styles.periodoCriacao}>
            <Header title="Período" appendTitle="Criação" subtitle="Criei um novo período escolar e seus respectivos subperíodos" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key="formularioPeriodo">
                <InputText typeInput="text" idInput="nomePeriodo" edicao={true} placeholderInput="escreva o título do período" valueInput={valorNomePeriodo} eventoCapturarTextoInput={handleValorTitulo} label="Nome do período" />
                <div className={styles.informacoesPeriodo}>
                    <SelectTipoPeriodo somenteLeitura={false} label="Tipo do período" eventoSelecionado={handleTipoPeriodo} />
                    <InputText typeInput="date" valueInput="" idInput={"dataInicioPeriodo"} edicao={true} label="Data início" eventoCapturarTextoInput={handleDataInicio} />
                    <InputText typeInput="date" valueInput="" idInput={"dataFimPeriodo"} edicao={true} label="Data fim" eventoCapturarTextoInput={handleDataFim} />
                </div>
                <Line />
                <Title valueTitle="Subperíodos" />
                <div className={styles.listaSubperiodos} id="subperiodos">
                    {lista.map((item, index) => {
                        indexSubperiodo++;
                        return (
                            <div className={styles.inputSubperiodo} key={index} id={`${item}`}>
                                <p className={styles.tituloSubperiodo}>{`${indexSubperiodo}° subperíodo`}</p>
                                <InputText typeInput="text" idInput={indexSubperiodo.toString()} placeholderInput="insira o nome do subperíodo" edicao={true} eventoCapturarTextoInput={handleNomeSubperiodo} descricao_input="nome_subperiodo" />
                                <InputText typeInput="date" idInput={indexSubperiodo.toString()} valueInput="" edicao={true} descricao_input="data_inicio_subperiodo" eventoCapturarTextoInput={handleDataInicioSubperiodo} />
                                <InputText typeInput="date" idInput={indexSubperiodo.toString()} valueInput="" edicao={true} descricao_input="data_fim_subperiodo" eventoCapturarTextoInput={handleDataFimSubperiodo} />
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
}
