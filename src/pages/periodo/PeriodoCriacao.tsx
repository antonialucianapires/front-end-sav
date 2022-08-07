import { useState } from "react";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { SelectTipoPeriodo } from "../../components/form/select/SelectTipoPeriodo";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { Title } from "../../components/others/Title";
import { ListFunction } from "../../components/util/ListFunction";
import styles from "./PeriodoCriacao.module.css";

enum tiposPeriodo {
    BIMESTRAL = "BIMESTRAL",
    TRIMESTRAL = "TRIMESTRAL",
    SEMESTRAL = "SEMESTRAL"
}

let lista = ListFunction(0);

export function PeriodoCriacao() {

    const [option, setOption] = useState("0");

    function handleChange(event: any) {
        setOption(event.target.value)
    }

    switch (option) {
        case tiposPeriodo.BIMESTRAL:
            lista = ListFunction(6)
            break;
        case tiposPeriodo.TRIMESTRAL:
            lista = ListFunction(4)
            break;
        case tiposPeriodo.SEMESTRAL:
            lista = ListFunction(2)
            break;
        default:
            lista = ListFunction(0)
    }

    return (
        <div className={styles.periodoCriacao}>
            <Header title="Período" appendTitle="Criação" subtitle="Criei um novo período escolar e seus respectivos subperíodos" username="Andreia Gomes" />
            <form className={styles.formularioPeriodo} key="formularioPeriodo">
                <InputText typeInput="text" idInput="nomePeriodo" edicao={true} valueInput="escreva o título do período" />
                <div className={styles.informacoesPeriodo}>
                    <SelectTipoPeriodo evento={handleChange} somenteLeitura={false} />
                    <InputText typeInput="date" valueInput="" idInput={"dataInicioPeriodo"} edicao={true} />
                    <InputText typeInput="date" valueInput="" idInput={"dataFimPeriodo"} edicao={true} />
                </div>
                <Line />
                <Title valueTitle="Subperíodos" />
                <div className={styles.listaSubperiodos}>
                    {lista.map((item, index) => {
                        return (
                            <div className={styles.inputSubperiodo} key={index} id={`${item}`}>
                                <InputText typeInput="text" idInput="nomeSubperiodo" placeholderInput="insira o nome do subperíodo" edicao={true} />
                                <InputText typeInput="date" idInput="dataInicioSubperiodo" valueInput="" edicao={true} />
                                <InputText typeInput="date" idInput="dataFimSubperiodo" valueInput="" edicao={true} />
                            </div>
                        )
                    })}
                </div>
                <div className={lista.length > 0 ? styles.buttons : styles.botaoSalvarNone}>
                    <PageButton nameButton="cancelar" linkButton="/periodos" colorButton="red" />
                    <button type="submit" className={styles.botaoSalvar}>salvar</button>
                </div>
            </form>
        </div>
    )
}


const getValue = (data: any) => {
    return data.value;
}