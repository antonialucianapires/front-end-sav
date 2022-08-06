import styles from './CardPeriodo.module.css';
import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function CardPeriodo(props: any) {


    let style = styles.statusDefault;

    switch (props.status) {
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
    const isDesabilidado = props.status === 'encerrado';

    return (
        <div className={styles.cardPeriodo}>
            <h3>{props.nome}</h3>
            <div className={styles.statusBox}>
                <p className={style}>{props.status}</p>
                <DotsThreeOutlineVertical size={25} color={"var(--gray-500)"} onClick={mostrarOpcoesFuncao} cursor={"pointer"} />
            </div>
            <ul id='listaOpcoes' className={mostrarOpcoes ? styles.comOpcoes : styles.semOpcoes}>
                <li><Link className={styles.opcaoHabilitada} to={"/periodos/" + props.idPeriodo + "/resumo"}>Visualizar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><Link className={styles.opcaoHabilitada} to={"/periodos/" + props.idPeriodo + "/edicao"}>Editar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><Link to={"/periodos"} className={styles.opcaoHabilitada} onClick={() => props.eventoExcluir(props.idPeriodo)}>Excluir</Link></li>
            </ul>
        </div>
    );
}