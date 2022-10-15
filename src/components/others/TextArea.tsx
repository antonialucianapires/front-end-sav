import styles from "./TextArea.module.css";

type TextAreaType = {
    placeholder?: string;
    label: string;
    evento?: any;
    isEdicao: boolean;
    valorAtual? : string;
}

export function TextArea(props: TextAreaType) {

    if (props.isEdicao) {

        function capturarEnunciado(event: React.ChangeEvent<HTMLTextAreaElement>) {
            event.preventDefault();
            props.evento(event.target.value);
        }
    
        return (
            <div>
                <label><b>{props.label}</b></label>
                <textarea className={styles.textArea} placeholder={props.placeholder} readOnly={!props.isEdicao} onChange={capturarEnunciado} value={props.valorAtual ? props.valorAtual : ""}>
                </textarea>
            </div>
        )
        
    }

    return (
        <div>
            <label><b>{props.label}</b></label>
            <textarea className={styles.textAreaReadOnly} readOnly={props.isEdicao} value={props.valorAtual}>
            </textarea>
        </div>
    )
    
}