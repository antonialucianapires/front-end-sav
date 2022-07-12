import { useState } from "react";
import styles from "./InputText.module.css";

type InputTextType = {
    typeInput: string;
    valueInput: any;
    idInput: string;
    edicao: boolean;
}

export function InputText(input: InputTextType){

    const [valueInputText, setValueInputText] = useState(input.valueInput);

    return(
        <input className={input.edicao ? styles.inputText : styles.inputTextEdit} type={input.typeInput} id={input.idInput} value={valueInputText} placeholder={valueInputText} onChange={e => setValueInputText(e.target.value)} readOnly={!input.edicao} />
    )
}