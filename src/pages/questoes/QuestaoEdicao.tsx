import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { InputText } from "../../components/form/input/InputText";
import { SelectNivelQuestao } from "../../components/form/select/SelectNivelQuestao";
import { SelectTipoQuestao } from "../../components/form/select/SelectTipoQuestao";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { TextArea } from "../../components/others/TextArea";
import { Title } from "../../components/others/Title";
import { ListFunction } from "../../components/util/ListFunction";
import styles from "./QuestaoEdicao.module.css";
const url = import.meta.env.VITE_BASE_URL;

let lista = ListFunction(0);

type OpcaoResposta = {
    id: number;
    descricao: string;
}

type TipoQuestao = {
    id: number;
    nome: string;
}

type ItemQuestao = {
    id: number;
    descricao: string;
    indicadorGabarito: string;
}

type Questao = {
    id: number;
    titulo: string;
    enunciado: string;
    tipoQuestao: TipoQuestao;
    nivelQuestao: string;
    itens: ItemQuestao[];
}


export function QuestaoEdicao() {

    const { id } = useParams();

    const [questao, setQuestao] = useState<Questao>();
    const [codigoTipoSelecionado, setCodigoTipoSelecionado] = useState(0);
    const [nivelSelecionado, setNivelSelecionado] = useState("FACIL");
    const [tipoResposta, setTipoResposta] = useState("RESPOSTA_LIVRE");
    const [nomeTipoResposta, setNomeTipoResposta] = useState("");
    const [enunciado, setEnunciado] = useState("");
    const [titulo, setTitulo] = useState("");
    const [opcoes, setOpcoes] = useState<OpcaoResposta[]>([]);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        axios.get(`${url}/questoes/${id}`)
            .then((response) => {
                setQuestao(response.data.payload)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    function capturarValorTitulo(tituloQuestao: string) {
        setTitulo(tituloQuestao);
    }

    function capturarNivelSelecionado(nivelSelecionado: string) {
        setNivelSelecionado(nivelSelecionado)
       
    }

    function capturarTipoSelecionado(tipoSelecionado: number, nomeTipo: string) {
        setNomeTipoResposta(nomeTipo)
        let nomeTipoSelecionado = nomeTipo.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase().replace(" ", "_");
        setTipoResposta(nomeTipoSelecionado);
        setCodigoTipoSelecionado(tipoSelecionado);
        // setOpcoes([])
    }

    function capturarEnunciado(enunciadoTexto: string) {
        setEnunciado(enunciadoTexto);
    }

    function capturarValorQuestao(texto: string, id: string) {

        let opcao = {
            id: parseInt(id),
            descricao: texto
        }

        let opcaoAtual = opcoes.find(o => o.id === parseInt(id))

        if (opcaoAtual) {
            let index = opcoes.indexOf(opcaoAtual);
            opcoes.splice(index, 1);
            opcoes.push(opcao)
        } else {
            opcoes.push(opcao)
        }

    }

    return (<div className={styles.questaoEdicao}>
        <Header title="Questões" appendTitle="edição" username="Andreia Gomes" subtitle="Veja o resumo da questão criada e/ou clique editar para atualizar a questão" />

        <form className={styles.formularioQuestao}>
            <InputText typeInput="text" idInput="tituloQuestao" edicao={true} valueInput={questao ? questao.titulo : ""}  label="Título" eventoCapturarTextoInput={capturarValorTitulo} />
            <SelectTipoQuestao eventoSelecionado={capturarTipoSelecionado} />
            <SelectNivelQuestao eventoSelecionado={capturarNivelSelecionado} />
            <TextArea placeholder="Escreva o enunciado da questão" label="Enunciado" evento={capturarEnunciado} isEdicao={true} />
        </form>
        <Line />
        <Title valueTitle="Opções da questão" />
        
    </div>)
}