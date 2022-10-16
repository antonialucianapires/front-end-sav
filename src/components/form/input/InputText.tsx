import { useState } from "react";
import styles from "./InputText.module.css";

type InputTextType = {
    typeInput: string;
    valueInput?: any;
    placeholderInput?: string;
    idInput: string;
    edicao: boolean;
    label?: string;
    eventoCapturarTextoInput?: any;
    descricao_input?: string;
    inputKey? : number;
    pattern? : string;
}

export function InputText(input: InputTextType){

    const [valueInputText, setValueInputText] = useState(input.valueInput);
    const [idInputText, setIdInputText] = useState(input.idInput);
    
    if(input.edicao) {
        
        if(input.eventoCapturarTextoInput) {
            input.eventoCapturarTextoInput(valueInputText, idInputText, input.descricao_input)
        }

        return(
            <div>
             <label className={input.label ? styles.label : styles.notLabel}>{input.label}</label>
              <input className={input.edicao ? styles.inputText : styles.inputTextEdit} type={input.typeInput} id={input.idInput} value={valueInputText} placeholder={input.placeholderInput ? input.placeholderInput : valueInputText} onChange={e => {setValueInputText(e.target.value), setIdInputText(e.target.id)}} readOnly={!input.edicao} data-descricao-input={input.descricao_input} data-input-key={input.inputKey}/>
            </div>
         ) 
    }

    return(
       <div>
        <label className={input.label ? styles.label : styles.notLabel}>{input.label}</label>
         <input className={input.edicao ? styles.inputText : styles.inputTextEdit} type={input.typeInput} id={input.idInput} value={valueInputText} placeholder={input.placeholderInput ? input.placeholderInput : valueInputText} readOnly={!input.edicao} />
       </div>
    )
}