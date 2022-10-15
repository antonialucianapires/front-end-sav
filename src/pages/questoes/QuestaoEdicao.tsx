import { FormControl, RadioGroup, FormControlLabel, Radio, Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
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

type tipo_questao = {
    id: number;
    nome: string;
}

type ItemQuestao = {
    id: number;
    descricao: string;
    indicador_gabarito: string;
}

type Questao = {
    id: number;
    titulo: string;
    enunciado: string;
    tipo_questao: tipo_questao;
    nivel_questao: string;
    itens_questao: ItemQuestao[];
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
    const [opcaoGabarito, setOpcaoGabarito] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/questoes/${id}`)
            .then((response) => {
                setQuestao(response.data.payload)

                if (questao) {
                    setEnunciado(questao.enunciado)
                }


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
    const capturarOpcaoGabarito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpcaoGabarito((event.target as HTMLInputElement).value);
        console.log(event.target)

        if (questao) {

            let questaoGabarito = questao.itens_questao.find(i => i.indicador_gabarito === 'S');

            if (questaoGabarito) {

                if (questaoGabarito.descricao !== event.target.value) {
                    questaoGabarito.indicador_gabarito = 'N';

                    let questaoNovoGabarito = questao.itens_questao.find(i => i.descricao === event.target.value);

                    if (questaoNovoGabarito) {
                        questaoNovoGabarito.indicador_gabarito = 'S';
                    }
                }

            }
        }

    };

    function capturarTipoSelecionado(tipoSelecionado: number, nomeTipo: string) {
        setNomeTipoResposta(nomeTipo)
        let nomeTipoSelecionado = nomeTipo.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase().replace(" ", "_");
        setTipoResposta(nomeTipoSelecionado);
        setCodigoTipoSelecionado(tipoSelecionado);
    }

    function capturarEnunciado(enunciadoTexto: string) {
        setEnunciado(enunciadoTexto);
    }

    function atualizarQuestao() {

        if (questao) {

            let questaoAtualizada = {
                id: questao.id,
                titulo: titulo,
                enunciado: enunciado === "" || !enunciado ? questao.enunciado : enunciado,
                tipo_questao: questao.tipo_questao.id,
                nivel_questao: nivelSelecionado,
                itens_questao: questao.itens_questao
            }

            console.log(questaoAtualizada)

            axios.put(`${url}/questoes`, questaoAtualizada)
                .then((response) => {


                    setOpenSucesso(true)
                    setMensagem(`${response.data.message}! Direcionado você para a página de questões...`)

                    setTimeout(() => navigate("/questoes"), 3000)




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


    return (<div className={styles.questaoEdicao}>
        <Header title="Questões" appendTitle="edição" username="Andreia Gomes" subtitle="Veja o resumo da questão criada e/ou clique editar para atualizar a questão" />

        <form className={styles.formularioQuestao} key={questao ? questao.titulo : ""}>
            <InputText typeInput="text" idInput="tituloQuestao" edicao={true} valueInput={questao ? questao.titulo : ""} label="Título" eventoCapturarTextoInput={capturarValorTitulo} />
            <SelectTipoQuestao eventoSelecionado={capturarTipoSelecionado} nomeTipoAtual={questao ? questao.tipo_questao.nome : ""} somenteLeitura={true} />
            <SelectNivelQuestao eventoSelecionado={capturarNivelSelecionado} nomeTipoAtual={questao ? questao.nivel_questao : ""} />
            <TextArea label="Enunciado" evento={capturarEnunciado} isEdicao={true} valorAtual={questao ? questao.enunciado : ""} />
        </form>
        <Line />
        <Title valueTitle="Opções da questão" />
        <FormControl>
            <div className={styles.blocoInfoDialgo}>
                <span><strong>Seleciona a opção gabarito: </strong></span>
            </div>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={questao && questao.itens_questao.length > 0 ? questao.itens_questao.filter(o => o.indicador_gabarito === 'S')[0] : ""}
                name="radio-buttons-group"
                styleName={styles.grupoOpcoesDialogo}
                onChange={capturarOpcaoGabarito}
            >
                {questao?.itens_questao.map(op => {
                    if (op.indicador_gabarito === 'S') {
                        return <FormControlLabel value={op.descricao} control={<Radio />} label={op.descricao} key={op.id} id={op.id.toString()} checked />
                    }
                    return <FormControlLabel value={op.descricao} control={<Radio />} label={op.descricao} key={op.id} id={op.id.toString()} />
                })}

            </RadioGroup>
        </FormControl>
        <div className={styles.buttons}>
            <PageButton nameButton="cancelar" linkButton="/questoes" colorButton="red" />
            <button type="button" className={styles.botaoSalvar} onClick={atualizarQuestao}>salvar</button>
        </div>
        <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
        <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
    </div>)
}