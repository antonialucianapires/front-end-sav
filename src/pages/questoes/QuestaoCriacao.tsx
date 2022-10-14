import { FormControl, RadioGroup, FormControlLabel, Radio, TextField, DialogProps, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectNivelQuestao } from "../../components/form/select/SelectNivelQuestao";
import { SelectTipoQuestao } from "../../components/form/select/SelectTipoQuestao";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { TextArea } from "../../components/others/TextArea";
import { Title } from "../../components/others/Title";
import { ListFunction } from "../../components/util/ListFunction";
import styles from "./QuestaoCriacao.module.css";
const url = import.meta.env.VITE_BASE_URL;

let lista = ListFunction(0);

type OpcaoResposta = {
    id: number;
    descricao: string;
}


export function QuestaoCriacao() {

    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoResposta, setTipoResposta] = useState("RESPOSTA_LIVRE");
    const [nomeTipoResposta, setNomeTipoResposta] = useState("");
    const [codigoTipoSelecionado, setCodigoTipoSelecionado] = useState(0);
    const [nivelSelecionado, setNivelSelecionado] = useState("FACIL");
    const [enunciado, setEnunciado] = useState("");
    const [titulo, setTitulo] = useState("");
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [opcoes, setOpcoes] = useState<OpcaoResposta[]>([]);
    const [opcaoGabarito, setOpcaoGabarito] = useState("");
    const navigate = useNavigate();

    function capturarValorTitulo(tituloQuestao: string) {
        setTitulo(tituloQuestao);
    }

    function capturarTipoSelecionado(tipoSelecionado: number, nomeTipo: string) {
        setNomeTipoResposta(nomeTipo)
        let nomeTipoSelecionado = nomeTipo.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase().replace(" ", "_");
        setTipoResposta(nomeTipoSelecionado);
        setCodigoTipoSelecionado(tipoSelecionado);
        setOpcoes([])
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

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const capturarOpcaoGabarito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpcaoGabarito((event.target as HTMLInputElement).value);
      };

    
    function criarQuestao() {

        let itensQuestao = opcoes.map(opcao => {
            if(opcao.descricao === opcaoGabarito) {
                return {
                    descricao: opcao.descricao,
                    indicador_gabarito: 'S'
                }
            }

            return {
                descricao: opcao.descricao,
                indicador_gabarito: 'N'
            }
        })

        let questao = {
            titulo: titulo,
            enunciado: enunciado,
            tipo_questao: codigoTipoSelecionado,
            nivel: nivelSelecionado,
            itens_questao: itensQuestao
        }

        console.log(questao)

        axios.post(`${url}/questoes`, questao)
                .then((response) => {
                    setOpen(false)
                    setTimeout(() => {
                        setOpenSucesso(true)
                        setMensagem(`${response.data.message}! Direcionado você para a página de questões...`)

                        setTimeout(() => navigate("/questoes"), 3000)

                    },2000)
                                        

                }).catch((error) => {
                    setOpenErro(true)

                    if (error.response.data.status === 500) {
                        setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
                    } else {
                        setMensagem(error.response.data.message)
                    }

                });
    }
      
    return (<div className={styles.questaoCriacao}>
        <Header title="Questões" appendTitle="criação" username="Andreia Gomes" subtitle="Crie uma nova questão para compor avaliações" />
        <form className={styles.formularioQuestao}>
            <InputText typeInput="text" idInput="tituloQuestao" edicao={true} placeholderInput="Escreva o título da questão" label="Título" eventoCapturarTextoInput={capturarValorTitulo} />
            <SelectTipoQuestao eventoSelecionado={capturarTipoSelecionado} />
            <SelectNivelQuestao eventoSelecionado={capturarNivelSelecionado} />
            <TextArea placeholder="Escreva o enunciado da questão" label="Enunciado" evento={capturarEnunciado} isEdicao={true} />
        </form>
        <Line />
        <Title valueTitle="Opções da questão" />
        <p className={styles.subtitle}>Escreva o título de cada opção de resposta. Questões do tipo "resposta livre" não possuem resposta padrão, logo o gabarito não será automático, necessitando de atuação da pessoa docente.</p>
        <p className={styles.descricaoOpcoesQuestao}><b>você selecionou o tipo de resposta:</b> <span><i>{nomeTipoResposta === "default" ? "nenhuma" : nomeTipoResposta}</i></span></p>
        <section className={styles.opcoesQuestao}>
            {lista.map((item, index) => {
                index++
                return <TextField id={index.toString()} data-id-input={"inputRespostaQuestao"} label="descrição da opção" variant="outlined" color="primary" styleName={styles.inputQuestaoItem} onChange={(evento) => capturarValorQuestao(evento.target.value, evento.target.id)} />
            })}
        </section>
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" color={"var( --blue-700)"}>Revisão e Gabarito</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <p className={styles.descricaoPopupFinalizar}>Revise a questão elaborada e selecione qual opção é gabarito para finalizar:</p>
                        <Line />
                        <div className={styles.blocoInfoDialgo}>
                            <span><strong>Título da questão: </strong></span>
                            <p>{titulo}</p>
                        </div>
                        <div className={styles.blocoInfoDialgo}>
                            <span><strong>Tipo da questão:</strong></span>
                            <p>{nomeTipoResposta}</p>
                        </div >
                        <div className={styles.blocoInfoDialgo}>
                            <span><strong>Nível da questão:</strong></span>
                            <p>{nivelSelecionado}</p>
                        </div>
                        <div className={styles.blocoInfoDialgo}>
                            <span><strong>Enunciado da questão:</strong></span>
                            <p>{enunciado}</p>
                        </div>
                        <FormControl>
                            <div className={styles.blocoInfoDialgo}>
                                <span><strong>Seleciona a opção gabarito: </strong></span>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={opcoes && opcoes.length > 0 ? opcoes[0].descricao : ""}
                                name="radio-buttons-group"
                                styleName={styles.grupoOpcoesDialogo}
                                onChange={capturarOpcaoGabarito}
                            >

                                {opcoes.map(op => {
                                    return <FormControlLabel value={op.descricao} control={<Radio />} label={op.descricao} />
                                })}

                            </RadioGroup>
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancelar</Button>
                    <Button onClick={criarQuestao}>confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div className={styles.buttons}>
            <PageButton nameButton="cancelar" linkButton="/questoes" colorButton="red" />
            <button type="button" className={styles.botaoSalvar} onClick={handleClickOpen('paper')}>criar questão</button>
        </div>
        <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
        <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
    </div>);
}