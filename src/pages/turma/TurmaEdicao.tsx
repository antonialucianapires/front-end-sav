import { PlusCircle } from "phosphor-react";
import { useParams } from "react-router";
import { CardInscrito } from "../../components/card/turma/CardInscrito";
import { InputText } from "../../components/form/input/InputText";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { useFetch } from "../../hooks/useFetch";
import styles from "./TurmaVisualizacao.module.css";
const url = import.meta.env.VITE_BASE_URL;

type InscritoTurma = {
    id: number;
    email: string;
    nome: string;
    status: string;
    tipo: string;
    url_imagem: string;
}

type TurmaType = {
    id_turma: number;
    nome: string;
    nome_periodo: string;
    descricao: string;
    data_criacao: string;
    inscritos: InscritoTurma[];
}

export function TurmaEdicao() {


    const { id } = useParams();

    let { data: turma } = useFetch<TurmaType>(`${url}/turmas/${id}/inscritos`, 'get');

    return (
        <div className={styles.turmaVisualizacao}>
            <Header title={"Turma"} appendTitle="edição" subtitle="Veja o resumo da turma selecionada com seus inscritos" username="Andreia Gomes" />
            <form className={styles.formularioTurma} key={turma ? turma.nome : ""}>
                <InputText typeInput="text" idInput="nomeTurma" valueInput={turma ? turma.nome : ""} edicao={false} styleName={styles.itemFormulario} label="Nome" />
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={turma ? turma.nome_periodo : ""} edicao={false} styleName={styles.itemFormulario} label="Período" />
                <InputText typeInput="text" idInput="descricaoTurma" valueInput={turma ? turma.descricao : ""} edicao={false} styleName={styles.itemFormulario} label="Descrição" />
            </form>
            <Line />
            <div className={styles.tituloBotaoInscrito}>
                <h3 className={styles.tituloInscritos}>Docentes</h3>
                <PlusCircle size={30} cursor="pointer" className={styles.botaoAdicionar} color={"var(--green-200)"} /> 
            </div>
            {turma?.inscritos.filter(inscrito => inscrito.tipo === "DOCENTE").map(inscrito => {
                return <CardInscrito urlImagem={inscrito.url_imagem} tipoInscrito={inscrito.tipo} nome={inscrito.nome} idInscrito={inscrito.id} isEdicao={false} />
            })}

            <div className={styles.tituloBotaoInscrito}>
                <h3 className={styles.tituloInscritos}>Estudantes</h3>
                <PlusCircle size={30} cursor="pointer" className={styles.botaoAdicionar} color={"var(--green-200)"} /> 
            </div>
            {turma?.inscritos.filter(inscrito => inscrito.tipo === "ESTUDANTE").map(inscrito => {
                return <CardInscrito urlImagem={inscrito.url_imagem} tipoInscrito={inscrito.tipo} nome={inscrito.nome} idInscrito={inscrito.id} isEdicao={false} />
            })}
        </div>
    );
}