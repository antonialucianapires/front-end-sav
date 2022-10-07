import { useState } from "react";
import styles from "./InputText.module.css";

type InputTextType = {
    typeInput: string;
    valueInput?: any;
    placeholderInput?: string;
    idInput: string;
    edicao: boolean;
    label?: string;
}

export function InputText(input: InputTextType){

    const [valueInputText, setValueInputText] = useState(input.valueInput);

    return(
       <div>
        <label className={input.label ? styles.label : styles.notLabel}>{input.label}</label>
         <input className={input.edicao ? styles.inputText : styles.inputTextEdit} type={input.typeInput} id={input.idInput} value={valueInputText} placeholder={input.placeholderInput ? input.placeholderInput : valueInputText} onChange={e => setValueInputText(e.target.value)} readOnly={!input.edicao} />
       </div>
    )
}