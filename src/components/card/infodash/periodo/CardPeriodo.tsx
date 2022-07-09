import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useState } from 'react';
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

    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

    function mostrarOpcoesFuncao() {
        if (mostrarOpcoes) {
            setMostrarOpcoes(false)
        } else {
            setMostrarOpcoes(true)
        }
    }

    return (
        <div className={styles.cardPeriodo}>
            <h3>{periodo.nome}</h3>
            <div className={styles.statusBox}>
                <p className={style}>{periodo.status}</p>
                <DotsThreeOutlineVertical size={25} color={"var(--gray-500)"} onClick={mostrarOpcoesFuncao} cursor={"pointer"} />
            </div>
            <ul id='listaOpcoes' className={mostrarOpcoes ? styles.comOpcoes : styles.semOpcoes}>
                <li>Visualizar</li>
                <li>Editar</li>
                <li>Excluir</li>
            </ul>
        </div>
    );
}