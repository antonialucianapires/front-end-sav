import styles from "./PeriodoVisualizacao.module.css";
import { Header } from "../../components/header/Header";
import { useFetch } from "../../hooks/useFetch";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";

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
    subperiodos: Subperiodo[];

}

export function PeriodoVisualizacao() {

    let { data : periodo } = useFetch<PeriodoType>('https://back-end-sav.herokuapp.com/sav/api/periodos/4', 'get');

    return (
        <div className={styles.periodoVisualizacao}>
            <Header title={periodo?.nome_periodo} subtitle="Veja o resumo do período e subperíodos do processo de avaliação" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo}>
                <label>Nome do período</label>
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={periodo ? periodo.nome_periodo : ""} edicao={false} />
                <label>Tipo do período</label>
                <SelectTipoPeriodo nomeTipoAtual={periodo ? periodo.tipo_periodo : ""} />
                <label>Data início</label>
                <InputText typeInput="text" idInput="dataInicioPeriodo" valueInput={periodo ? periodo.data_inicio : ""}  edicao={false} />
                <label>Data fim</label>
                <InputText typeInput="text" idInput="dataFimPeriodo" valueInput={periodo ? periodo.data_fim : ""} edicao={false} />
            </form>
        </div>

    );
}