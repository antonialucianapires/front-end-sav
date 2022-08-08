import { CardInfoDash } from "../components/card/infodash/CardInfoDash";
import { GraficoMovimentacao } from "../components/grafico/GraficoMovimentacoes";
import { Header } from "../components/header/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './Home.module.css';

type infosCard = {
    title: string;
    value: string;
}

export function Home() {

    const { data: repositories } = useFetch<infosCard[]>('http://localhost:3100/api/sav/v1/resume', 'get');

    return (
        <div className={styles.home}>
            <Header title="Dashboard" username="Andreia Gomes" />
            <section className={styles.listCardInfo}>
                {
                    repositories?.map(item => {
                        return (
                            <CardInfoDash title={item.title} value={item.value} />
                        )
                    })
                }

            </section>
            <GraficoMovimentacao />
        </div>
    );
}