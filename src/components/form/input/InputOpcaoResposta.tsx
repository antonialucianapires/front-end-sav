import { Checkbox, FormControlLabel, FormGroup, Radio, TextField } from "@mui/material";
import styles from "./InputOpcaoResposta.module.css";

export function InputOpcaoResposta(props : any) {

    function bloquearOpcoes(event : React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        console.log(event.target.checked)
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
        <div className={styles.inputDivResposta} data-check-resposta="itemResposta">
             <FormControlLabel value="female" control={<Radio />} label="Female" />
             <input type={"text"} className={styles.inputText} /> 
        </div>
    )
}