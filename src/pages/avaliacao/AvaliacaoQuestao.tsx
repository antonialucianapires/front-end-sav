import { Alert, AlertTitle, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { QuestaoCard } from "../../components/card/questao/QuestaoCard";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { CheckboxTipoQuestao } from "../../components/form/select/CheckboxTipoQuestao";
import { Header } from "../../components/header/Header";
import styles from "./AvaliacaoQuestao.module.css";
const url = import.meta.env.VITE_BASE_URL;

type Avaliacao = {
    id: number;
    titulo: string;
    periodo: string;
    subperiodo: string;
    data_hora_inicio: string;
    data_hora_fim: string;
    nota_objetivo: number;
}

type QuestaoType = {
    id: number;
    titulo: string;
    enunciado: string;

}

type ValorQuestao = {
    id_questao: number;
    valor_questao: number;
}

export function AvaliacaoQuestao() {

    const { id } = useParams();
    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [avaliacao, setAvaliacao] = useState<Avaliacao>();
    const [text, setText] = useState("");
    const [tipo, setTipo] = useState<number[]>([]);
    const [questoes, setQuestoes] = useState<QuestaoType[]>([]);
    const [idsQuestao, setIdsQuestoes] = useState<Number[]>([]);
    const [valorQuestao, setValorQuestao] = useState<Number>(0.0);
    const [valores, setValores] = useState<ValorQuestao[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/avaliacoes/${id}?com_questoes=N`)
            .then((response) => {
                setAvaliacao(response.data.payload)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    useEffect(() => {

        axios.get(`${url}/questoes?semItens=true&enunciado=${text}&tipos=${tipo}`)
            .then((response) => {
                setQuestoes(response.data.payload.content)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })

    }, [text, tipo]);

    function capturarValorQuestao(valor: string, id: string) {

        if (idsQuestao.find(i => i === parseInt(id))) {

            let valorAtual = valores.find(v => v.id_questao === parseFloat(id));

            if (valorAtual) {
                valorAtual.valor_questao = parseFloat(valor);
            } else {
                valores.push({
                    id_questao: parseInt(id),
                    valor_questao: parseFloat(valor)
                })
                setValores(valores)
            }

        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {


        let id = parseInt(event.target.id);

        if (event.target.checked) {
            idsQuestao.push(id);
            setIdsQuestoes(idsQuestao);

            let valorAtual = valores.find(v => v.id_questao === id);

            if (valorAtual) {
                valorAtual.valor_questao = 0.0
            }

        } else {
            if (questoes.find(id => id === id)) {
                let index = idsQuestao.indexOf(id);
                idsQuestao.splice(index, 1);

                setIdsQuestoes(idsQuestao)

                let valorAtual = valores.find(v => v.id_questao === id);

                if (valorAtual) {
                    let index = valores.indexOf(valorAtual);
                    valores.splice(index, 1);
                }
            }
        }

    };

    function salvarAvaliacao() {

        let valoresAvaliacao = {
            id_avaliacao: avaliacao?.id,
            questoes: valores
        }

        if (valores.length === 0 || valores.map(v => v.valor_questao).length === 0) {
            setOpenErro(true)
            setMensagem("Verifique se as avaliações estão selecionadas e com seus valores definidos. É valido no mínimo uma questão por avaliação e a mesma deve totalizar a nota objetivo da avaliação.")
        } else {
            let somaValores = valores.map(v => v.valor_questao).reduce(function (soma, i) {
                return soma + i;
            })

            console.log(somaValores)

            if (somaValores === avaliacao?.nota_objetivo) {

                axios.put(`${url}/avaliacoes/questoes`, valoresAvaliacao)
                    .then((response) => {

                        setOpenSucesso(true)
                        setMensagem(response.data.message)
                        setTimeout(() => navigate(`/avaliacoes`), 4000)


                    }).catch((error) => {
                        setOpenErro(true)

                        if (error.response.data.status === 500) {
                            setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
                        } else {
                            setMensagem(error.response.data.message)
                        }

                    });


            } else {
                setOpenErro(true)
                setMensagem("A soma dos valores das questões não totalizam o valor objetivo da avaliação. Tente novamente.")
            }
        }



    }

    return (<div className={styles.avaliacaoQuestoes}>
        <Header title={"Turma"} appendTitle="questões" subtitle="Selecione as questões que irão compor esta avaliação" username="Andreia Gomes" />
        <label><strong>Informações gerais</strong></label>
        <section className={styles.blocoInfos}>
            <div>
                <span>título: </span>
                <p>{avaliacao?.titulo}</p>
            </div>
            <div>
                <span>data início: </span>
                <p>{avaliacao?.data_hora_inicio}</p>
            </div>
            <div>
                <span>data fim: </span>
                <p>{avaliacao?.data_hora_inicio}</p>
            </div>
            <div>
                <span>período: </span>
                <p>{avaliacao?.periodo}</p>
            </div>
            <div>
                <span>subperíodo: </span>
                <p>{avaliacao?.subperiodo}</p>
            </div>
            <div>
                <span>nota objetivo: </span>
                <p>{avaliacao?.nota_objetivo}</p>
            </div>
        </section>
        <Alert severity="warning">
            <AlertTitle>Atenção</AlertTitle>
            A soma dos valores atribuídos em cada questão devem resultar no valor definido como nota objetivo da avaliação.
        </Alert>
        <br />
        <h4>Selecione questões</h4>
        <p>Busque questões para compor a avaliação, selecione-as e defina quanto vale cada questão associada</p>
        <form className={styles.formSearch} action="">
            <input className={styles.formInputSearch} value={text} name="pesquisaTurma" placeholder="Buscar questões pelo enunciado" onChange={(search) => setText(search.target.value)} />
        </form>
        <section className={styles.listaQuestoes}>
            <FormGroup className={styles.formGroupQuestoes}>
                {questoes.map(questao => {
                    return <div key={questao.id} className={styles.cardQuestao}><FormControlLabel control={<Checkbox onChange={handleChange} id={questao.id.toString()} />} label={<div className={styles.conjuntoInputsCard}>
                        <div>
                            <p className={styles.tituloQuestaoCard}>{questao.titulo}</p>
                            <p className={styles.enunciadoQuestaoCard}>{questao.enunciado}</p>
                        </div>
                        <InputText typeInput={"number"} idInput={questao.id.toString()} edicao={true} placeholderInput="0.0" label="Valor da questão" eventoCapturarTextoInput={capturarValorQuestao} />
                    </div>} /></div>
                })}
            </FormGroup>
        </section>
        <div className={styles.buttons}>
            <PageButton nameButton="cancelar" linkButton="/avaliacoes" colorButton="red" />
            <button type="button" className={styles.botaoSalvar} onClick={salvarAvaliacao}>finalizar</button>
        </div>
        <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
        <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>

    </div>)
}