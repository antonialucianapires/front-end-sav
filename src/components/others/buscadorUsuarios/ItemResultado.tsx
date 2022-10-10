import styles from "./ItemResultado.module.css";


export function ItemResultado(props : any) {
    return (
        <div className={styles.itemResultado} id-usuario={props.id} onClick={() => props.eventoSelecionar(props.id)}>
            <p>{props.nome}</p>
            <span className={styles.tipoUsuario}>{props.tipo}</span>
        </div>
    );
}