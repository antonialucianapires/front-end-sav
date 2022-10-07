import { CardInscrito } from "../../../components/card/turma/CardInscrito";
import styles from "./ListaInscritos.module.css";


type InscritoTurma = {
    id: number;
    email: string;
    nome: string;
    status: string;
    tipo: string;
    url_imagem: string;
}

type ListaType = {
    inscritos: InscritoTurma[];
    tipo: string;
}

export function ListaInscritos(lista: ListaType) {

    if (lista.inscritos.filter(inscrito => inscrito.tipo === lista.tipo).length === 0 || !lista.inscritos) {
        return <div className={styles.cardVazio}>
            <p>{`A turma não possui ${lista.tipo.toLowerCase()}s`}</p>
        </div>
    }

    return (
        <div>
            {lista.inscritos.filter(inscrito => inscrito.tipo === lista.tipo).map(inscrito  => {
                return <CardInscrito urlImagem={inscrito.url_imagem} tipoInscrito={inscrito.tipo} nome={inscrito.nome} idInscrito={inscrito.id} isEdicao={false} key={inscrito.id} />
            })}
        </div>
    );
}