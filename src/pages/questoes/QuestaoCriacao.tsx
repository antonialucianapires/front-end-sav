import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { useState } from "react";
import { InputOpcaoResposta } from "../../components/form/input/InputOpcaoResposta";
import { InputText } from "../../components/form/input/InputText";
import { SelectNivelQuestao } from "../../components/form/select/SelectNivelQuestao";
import { SelectTipoQuestao } from "../../components/form/select/SelectTipoQuestao";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { TextArea } from "../../components/others/TextArea";
import { Title } from "../../components/others/Title";
import { ListFunction } from "../../components/util/ListFunction";
import styles from "./QuestaoCriacao.module.css";

let lista = ListFunction(0);
export function QuestaoCriacao() {

    const [tipoResposta, setTipoResposta] = useState("RESPOSTA_LIVRE");
    const [nomeTipoResposta, setNomeTipoResposta] = useState("");
    const [codigoTipoSelecionado, setCodigoTipoSelecionado] = useState(0);
    const [nivelSelecionado, setNivelSelecionado] = useState("FACIL");
    const [enunciado, setEnunciado] = useState("");

    function capturarTipoSelecionado(tipoSelecionado: number, nomeTipo: string) {
        setNomeTipoResposta(nomeTipo)
        let nomeTipoSelecionado = nomeTipo.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase().replace(" ", "_");
        setTipoResposta(nomeTipoSelecionado);
        setCodigoTipoSelecionado(tipoSelecionado);
    }

    function capturarNivelSelecionado(nivelSelecionado: string) {
        setNivelSelecionado(nivelSelecionado)
    }

    function capturarEnunciado(enunciadoTexto: string) {
        setEnunciado(enunciadoTexto);
    }

    switch (tipoResposta) {
        case "RESPOSTA_UNICA":
            lista = ListFunction(4)
            break;
        case "MULTIPLA_ESCOLHA":
            lista = ListFunction(4)
            break;
        case "DICOTOMICA":
            lista = ListFunction(2)
            break;
        default:
            lista = ListFunction(0)
    }

    let opcoesResposta = document.querySelectorAll(`[data-check="check"]`);

    if (opcoesResposta) {
        opcoesResposta.forEach(itemResposta => {
            console.log(itemResposta)
        })
    }



    return (<div className={styles.questaoCriacao}>
        <Header title="Questões" appendTitle="criação" username="Andreia Gomes" subtitle="Crie uma nova questão para compor avaliações" />
        <form className={styles.formularioQuestao}>
            <InputText typeInput="text" idInput="tituloQuestao" edicao={true} placeholderInput="Escreva o título da questão" label="Título" />
            <SelectTipoQuestao eventoSelecionado={capturarTipoSelecionado} />
            <SelectNivelQuestao eventoSelecionado={capturarNivelSelecionado} />
            <TextArea placeholder="Escreva o enunciado da questão" label="Enunciado" evento={capturarEnunciado} />
        </form>
        <Line />
        <Title valueTitle="Opções da questão" />
        <p className={styles.subtitle}>Escreva o título de cada opção de resposta. Questões do tipo "resposta livre" não possuem resposta padrão, logo o gabarito não será automático, necessitando de atuação da pessoa docente.</p>
        <p className={styles.descricaoOpcoesQuestao}><b>você selecionou o tipo de resposta:</b> <span><i>{nomeTipoResposta === "default" ? "nenhuma" : nomeTipoResposta}</i></span></p>
        <section className={styles.opcoesQuestao}>
        {lista.map((item, index) => {
            index++
            return <TextField id="outlined-basic"  label="descrição da opção" variant="outlined" color="primary" />
        })}
        </section>
    </div>);
}