import { TextField } from "@mui/material";
import { useParams } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectNivelQuestao } from "../../components/form/select/SelectNivelQuestao";
import { SelectTipoQuestao } from "../../components/form/select/SelectTipoQuestao";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { TextArea } from "../../components/others/TextArea";
import { Title } from "../../components/others/Title";
import { useFetch } from "../../hooks/useFetch";
import styles from "./QuestaoVisualizacao.module.css";
const url = import.meta.env.VITE_BASE_URL;

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

export function QuestaoVisualizacao() {

    const { id } = useParams();

    const endpointEdicao = `/questoes/${id}/edicao`

    let { data: questao } = useFetch<Questao>(`${url}/questoes/${id}`, 'get');

    console.log(questao)

    let itensQuestao: ItemQuestao[] = questao ? questao.itens : [];



    return (<div className={styles.questaoVisualizacao}>
        <Header title="Questões" appendTitle="visualização" username="Andreia Gomes" subtitle="Veja o resumo da questão criada e/ou clique editar para atualizar a questão" />

        <form className={styles.formularioQuestao}>
            <InputText typeInput="text" idInput={questao ? questao.id.toString() : ""} edicao={false} valueInput={questao ? questao.titulo : ""} placeholderInput={questao ? questao.titulo : ""} label="Título" />
            <SelectTipoQuestao somenteLeitura={true} nomeTipoAtual={questao ? questao.tipoQuestao.nome : ""}/>
            <SelectNivelQuestao somenteLeitura={true} nomeTipoAtual={questao ? questao.nivelQuestao : ""}/>
            <TextArea valorAtual={questao ? questao.enunciado : ""} label="Enunciado" isEdicao={false} />
        </form>
        <Line />
        <Title valueTitle="Opções da questão" />
        <p className={styles.subtitle}>A seguir estão as opções de resposta da questão. Se a questão for de resposta livre, não terá opções expostas. 
        <br/>Observação: para casos de questão múltipla escolha e/ou dicotômica, o gabarito é a opção destacada.</p>
        <ul className={styles.opcoesQuestao}>
            {itensQuestao.map(item => {
                return <li className={item.indicadorGabarito === 'S' ? styles.inputQuestaoGabarito : undefined}>{item.descricao}</li>
            })}
        </ul>

        <div className={styles.listaBotoes}>
            <PageButton nameButton="voltar" linkButton="/questoes" colorButton="blue" />
            <PageButton nameButton="editar" linkButton={endpointEdicao} colorButton="green" />
            </div>

    </div>);
}