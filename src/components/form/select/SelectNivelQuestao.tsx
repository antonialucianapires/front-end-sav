import styles from "./SelectNivelQuestao.module.css";


enum Nivel {
    FACIL,
    MEDIO,
    DIFICL
}

type NivelType = {
    id: number;
    nivel: string;
    descricao: string;
}

export function SelectNivelQuestao(props: any) {

    const niveis: NivelType[] = [];

    niveis.push(
        {
            id: 1,
            nivel: "FACIL",
            descricao: "Fácil"
        },
        {
            id: 2,
            nivel: "MEDIO",
            descricao: "Médio"
        },
        {
            id: 3,
            nivel: "DIFICIL",
            descricao: "Difícil"
        }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        event.preventDefault();

        const optionSelected = event.target.selectedOptions.item(0);

        if (optionSelected) {
            let nome = optionSelected.getAttribute("data-tipo")
            props.eventoSelecionado(nome)
        }

    }


    return (
        <div>
            <label><b>Nível</b></label>
            <select tabIndex={props.tabIndex ? props.tabIndex : undefined} aria-disabled={props.somenteLeitura ? props.somenteLeitura : undefined} className={props.somenteLeitura ? styles.readOnly : styles.selectTipo} id="tiposQuestao" onChange={handleInputChange}>
                <option value="default">Selecionar</option>
                {niveis.map(tipo => {
                    if (props.nomeTipoAtual !== undefined && tipo.nivel === props.nomeTipoAtual) {
                        return <option id="tipoQuestao" key={tipo.id} value={tipo.nivel.toString()} defaultValue={tipo.nivel} selected={true} data-tipo={tipo.nivel}>{tipo.descricao}</option>
                    }
                    return <option id="tipoQuestao" key={tipo.id} value={tipo.nivel.toString()} data-tipo={tipo.nivel} >{tipo.descricao}</option>
                })}
            </select>
        </div>
    )
}