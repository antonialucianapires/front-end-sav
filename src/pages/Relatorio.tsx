import { CardInfoDash } from "../components/card/infodash/CardInfoDash";
import { Header } from "../components/header/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './Relatorio.module.css';

type infosCard = {
    title: string;
    value: string;
}

export function Relatorio() {

    const { data: repositories } = useFetch<infosCard[]>('http://localhost:3100/api/sav/v1/resume');

    return (
        <div className={styles.relatorio}>
            <Header title="Relatórios" username="Andreia Gomes" />
            <section className={styles.listCardInfo}>
                {
                    repositories?.map(item => {
                        return (
                            <CardInfoDash title={item.title} value={item.value} />
                        )
                    })
                }

            </section>
        </div>
    );
}