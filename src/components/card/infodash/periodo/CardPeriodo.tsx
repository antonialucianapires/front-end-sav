import styles from './CardPeriodo.module.css';

type Periodo = {
    nome: string;
    status: string;
};

export function CardPeriodo(periodo: Periodo) {

    let style = styles.statusDefault;

    switch (periodo.status) {
        case 'encerrado':
            style = styles.statusEncerrado;
            break;
        case 'andamento':
            style = styles.statusEmAndamento;
            break;
        case 'não iniciado':
            style = styles.statusNaoIniciado;
            break;
    }

    return (
        <div className={styles.cardPeriodo}>
            <h3>{periodo.nome}</h3>
            <p className={style}>{periodo.status}</p>
        </div>
    );
}