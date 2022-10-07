import { Trash } from "phosphor-react";
import { Avatar } from "../../avatar/Avatar";
import styles from "./CardInscrito.module.css";


export function CardInscrito(props: any) {

    if(!props.isEdicao) {
        return (<div className={styles.cardInscritoVisualizacao}>
            <div className={styles.infosInscrito}><Avatar urlImagem={props.urlImagem} />
            <p>{props.nome}</p></div>
            <p className={styles.tipoInscrito}>{props.tipoInscrito}</p>
        </div>);
    }

    return (<div className={styles.cardInscrito}>
        <div className={styles.infosInscrito}><Avatar urlImagem={props.urlImagem} />
        <p>{props.nome}</p></div>
        <p className={styles.tipoInscrito}>{props.tipoInscrito}</p>
        <Trash size={27} color="var(--red-500)" onClick={() => props.eventoExcluir(props.idTurma)} cursor="pointer" className={props.isEdicao ? styles.botaoExcluirVisivel : styles.botaoExcluirOculto}/>
    </div>);
}