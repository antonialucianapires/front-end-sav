import { useParams } from "react-router-dom";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { useFetch } from "../../hooks/useFetch";
import moment, { Moment } from "moment";
import styles from "./PeriodoEdicao.module.css";

type Subperiodo = {
    id: number;
    nome_subperiodo: string;
    data_inicio: Date;
    data_fim: Date;
}

type PeriodoType = {
    id: number;
    nome_periodo: string;
    tipo_periodo: string;
    data_inicio: Date;
    data_fim: Date;
    status: string;
    subperiodos?: Subperiodo[];

}

export function PeriodoEdicao() {

    const { id } = useParams();

    let { data: periodo } = useFetch<PeriodoType>(`https://back-end-sav.herokuapp.com/sav/api/periodos/${id}?com_subperiodos=true`, 'get');

    let periodoValue: PeriodoType = {
        id: 0,
        nome_periodo: "",
        tipo_periodo: "",
        data_inicio: new Date(),
        data_fim: new Date(),
        status: ""
    }

    let subperiodos: Subperiodo[] = [];

    if (periodo && periodo.subperiodos) {
        periodoValue = periodo;
        subperiodos = periodo.subperiodos;
    }

    return (
        <div className={styles.periodoEdicao}>
            <Header title={`${periodoValue.nome_periodo} | edição`} subtitle="Revise e edite o período de avaliação" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key={periodoValue.id}>
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={periodoValue.nome_periodo} edicao={true} />
                <SelectTipoPeriodo />
                <InputText typeInput="date" idInput="dataInicioPeriodo" valueInput={periodoValue.data_inicio} edicao={true} />
                <InputText typeInput="date" idInput="dataFimPeriodo" valueInput={periodoValue.data_fim} edicao={true} />
                <Line />
                <Title valueTitle="Subperíodos" />
                {subperiodos.map((subperiodo) => {
                    
                    return (
                        <div className={styles.listaSubperiodos} key={subperiodo.id}>
                            <InputText typeInput="text" idInput="nomeSubperiodo" valueInput={subperiodo.nome_subperiodo} edicao={true} />
                            <InputText typeInput="date" idInput="dataInicioSubperiodo" valueInput={subperiodo.data_inicio} edicao={true} />
                            <InputText typeInput="date" idInput="dataFimSubperiodo" valueInput={subperiodo.data_fim} edicao={true} />
                        </div>
                    )
                })}
                <div className={styles.buttons}>
                <PageButton nameButton="cancelar" linkButton="/periodos" colorButton="red" />
                <PageButton nameButton="salvar" linkButton="/periodos" colorButton="green" />
                </div>
            </form>
        </div>
    )

}