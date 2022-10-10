import { NotePencil, Trash } from 'phosphor-react';
import { Link } from 'react-router-dom';
import styles from './CardTurma.module.css'

export function CardTurma(props: any) {
    return (
        <div className={styles.cardTurma}>
            <h3>{props.nome}</h3>
            <div className={styles.total_estudantes}>
                <p className={styles.total}>{props.total_estudantes + ` estudantes`}</p>
            </div>
            <ul id='listaOpcoes'>
                <Link to={`/turmas/${props.idTurma}/visualizacao`}><NotePencil size={27} color="var(--blue-500)"/></Link>
                <Trash size={27} color="var(--red-500)" onClick={() => props.eventoExcluir(props.idTurma)} cursor="pointer"/>
            </ul>
        </div>
    );
}