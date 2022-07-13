import axios from 'axios';
import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import styles from './CardPeriodo.module.css';

type Periodo = {
    idPeriodo: number;
    nome: string;
    status: string;
};

type Payload = {
    message: string;
    status: number;
}

export function CardPeriodo(periodo: Periodo) {

    const [periodoCard, setPeriodoCard] = useState<Periodo>(periodo);

    const periodoHandler = () => {
        axios.get(`https://back-end-sav.herokuapp.com/sav/api/periodos/${periodoCard.idPeriodo}`)
            .then((response) => {
                setPeriodoCard(response.data.payload);
            })
    }

    const deleteHandler = (id: number) => {

        axios.delete(`https://back-end-sav.herokuapp.com/sav/api/periodos/${id}`)
            .then(() => {
                if (id === periodo.idPeriodo) {
                    return;
                } else {
                    periodoHandler()
                }
            })
    }


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
    const isDesabilidado = periodoCard.status === 'encerrado';

    return (
        <div className={styles.cardPeriodo}>
            <h3>{periodoCard.nome}</h3>
            <div className={styles.statusBox}>
                <p className={style}>{periodoCard.status}</p>
                <DotsThreeOutlineVertical size={25} color={"var(--gray-500)"} onClick={mostrarOpcoesFuncao} cursor={"pointer"} />
            </div>
            <ul id='listaOpcoes' className={mostrarOpcoes ? styles.comOpcoes : styles.semOpcoes}>
                <li><Link className={styles.opcaoHabilitada} to={"/periodos/" + periodoCard.idPeriodo + "/resumo"}>Visualizar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><Link className={styles.opcaoHabilitada} to={"/periodos/" + periodoCard.idPeriodo + "/edicao"}>Editar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><Link to={"/periodos"} className={styles.opcaoHabilitada} onClick={() => deleteHandler(periodoCard.idPeriodo)}>Excluir</Link></li>
            </ul>
        </div>
    );
}