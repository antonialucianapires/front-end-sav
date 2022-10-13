import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import styles from "./InputOpcaoResposta.module.css";

export function InputOpcaoResposta(props : any) {

    function bloquearOpcoes(event : React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        console.log(event.target.textContent)
    }


    if(props.tipoResposta === "DICOTOMICA") {
        return (
            <div className={styles.inputDivResposta}>
                 <input type="radio" className={styles.checkbox} />
                 <input type="text" className={styles.inputText} /> 
            </div>
        )
    }

    return (
        <div className={styles.inputDivResposta} onChange={bloquearOpcoes} data-check-resposta="itemResposta">
             <input type="checkbox" className={styles.checkbox} data-check="check" />
             <input type={"text"} className={styles.inputText} /> 
        </div>
    )
}