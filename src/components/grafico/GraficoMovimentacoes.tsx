import Chart from "react-google-charts";
import { useFetch } from "../../hooks/useFetch";
import styles from './GraficoMovimentacoes.module.css'

type Movimentacao = {
    informacao: string[];
}

export function GraficoMovimentacao() {

    const data : Movimentacao[] = [];

    const options = {
        title: "Movimentações dos usuários por dia",
        curveType: "function",
        legend: { position: "bottom" },
    }

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="500px"
            data={data}
            options={options}
            className={styles.grafico}
        />
    );
}