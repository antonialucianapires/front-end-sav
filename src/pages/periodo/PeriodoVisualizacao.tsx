import styles from "./PeriodoVisualizacao.module.css";
import { Header } from "../../components/header/Header";
import { useFetch } from "../../hooks/useFetch";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { PageButton } from "../../components/form/button/PageButton";
import { useParams } from "react-router-dom";

type Subperiodo = {
    id: number;
    nome_subperiodo: string;
    data_inicio: string;
    data_fim: string;
}

type PeriodoType = {
    id: number;
    nome_periodo: string;
    tipo_periodo: string;
    data_inicio: string;
    data_fim: string;
    status: string;
    subperiodos?: Subperiodo[];

}

export function PeriodoVisualizacao() {

    const { id } = useParams();

    let { data: periodo } = useFetch<PeriodoType>(`http://localhost:8080/sav/api/periodos/${id}?com_subperiodos=true`, 'get');

    let periodoValue: PeriodoType = {
        id: 0,
        nome_periodo: "",
        tipo_periodo: "",
        data_inicio: "",
        data_fim: "",
        status: ""
    }

    let subperiodos: Subperiodo[] = [];

    if (periodo && periodo.subperiodos) {
        periodoValue = periodo;
        subperiodos = periodo.subperiodos;
    }

    return (
        <div className={styles.periodoVisualizacao}>
            <Header title={periodo?.nome_periodo} subtitle="Veja o resumo do período e subperíodos do processo de avaliação" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key={periodoValue.id}>
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={periodoValue.nome_periodo} edicao={false} />
                <SelectTipoPeriodo nomeTipoAtual={periodoValue.tipo_periodo} somenteLeitura={true} tabIndex="-1"/>
                <InputText typeInput="text" idInput="dataInicioPeriodo" valueInput={periodoValue.data_inicio} edicao={false} />
                <InputText typeInput="text" idInput="dataFimPeriodo" valueInput={periodoValue.data_fim} edicao={false} />
                <Line />
                <Title valueTitle="Subperíodos" />
                {subperiodos.map((subperiodo) => {
                    return (
                        <div className={styles.listaSubperiodos} key={subperiodo.id}>
                            <InputText typeInput="text" idInput="nomeSubperiodo" valueInput={subperiodo.nome_subperiodo} edicao={false} />
                            <InputText typeInput="text" idInput="dataInicioSubperiodo" valueInput={subperiodo.data_inicio} edicao={false} />
                            <InputText typeInput="text" idInput="dataFimSubperiodo" valueInput={subperiodo.data_fim} edicao={false} />
                        </div>
                    )
                })}
                <PageButton nameButton="voltar" linkButton="/periodos" colorButton="blue" />
            </form>

        </div>

    );
}