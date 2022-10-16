
import { NotePencil, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import styles from './QuestaoCard.module.css';

export function CardAvaliacao(props : any) {
    return (
        <div className={styles.cardQuestao}>
           <header>
           <h2>{props.titulo}</h2>
           <ul id='listaOpcoes'>
                <Link to={`/avaliacoes`}><NotePencil size={27} color="var(--blue-500)"/></Link>
                <Trash size={27} color="var(--red-500)" cursor="none"/>
            </ul>
           </header>
           <p>{props.enunciado}</p>
        </div>
    );
}