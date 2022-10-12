import { CardInfoDash } from "../components/card/infodash/CardInfoDash";
import { GraficoMovimentacao } from "../components/grafico/GraficoMovimentacoes";
import { Header } from "../components/header/Header";
import styles from './Home.module.css';

type infosCard = {
    title: string;
    value: string;
}

export function Home() {

    const repositories : infosCard[] = [{
        title: "total avaliações",
        value: "50"
    }];

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