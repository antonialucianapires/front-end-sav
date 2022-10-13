import styles from "./TextArea.module.css";

type TextAreaType = {
    placeholder: string;
    label: string;
    evento: any;
}

export function TextArea(props : TextAreaType) {


    function capturarEnunciado(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        props.evento(event.target.value);
    }

    return (
    <div>
        <label><b>{props.label}</b></label>
        <textarea className={styles.textArea} placeholder={props.placeholder} onChange={capturarEnunciado}>
    </textarea>
    </div>
    )
}