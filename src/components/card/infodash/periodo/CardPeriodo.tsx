import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useState } from 'react';
import {  Link } from 'react-router-dom';
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

    function removerPeriodo() {
        
        const {data : response } = useFetch<Payload>(`https://back-end-sav.herokuapp.com/sav/api/periodos/${periodo.idPeriodo}`, 'delete');

        console.log(response)
    }

    const isDesabilidado = periodo.status === 'encerrado';

    return (
        <div className={styles.cardPeriodo}>
            <h3>{periodo.nome}</h3>
            <div className={styles.statusBox}>
                <p className={style}>{periodo.status}</p>
                <DotsThreeOutlineVertical size={25} color={"var(--gray-500)"} onClick={mostrarOpcoesFuncao} cursor={"pointer"} />
            </div>
            <ul id='listaOpcoes' className={mostrarOpcoes ? styles.comOpcoes : styles.semOpcoes}>
                <li><Link className={styles.opcaoHabilitada} to={"/periodos/" + periodo.idPeriodo + "/resumo"}>Visualizar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><Link className={styles.opcaoHabilitada} to={"/periodos/" + periodo.idPeriodo + "/edicao"}>Editar</Link></li>
                <li className={isDesabilidado ? styles.opcaoDesabilitada : styles.opcaoHabilitada}><button type='submit' className={styles.opcaoHabilitada} onClick={removerPeriodo}>Excluir</button></li>
            </ul>
        </div>
    );
}