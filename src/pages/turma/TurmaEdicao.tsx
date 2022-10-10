import { PlusCircle } from "phosphor-react";
import { useParams } from "react-router";
import { PageButton } from "../../components/form/button/PageButton";
import { InputText } from "../../components/form/input/InputText";
import { Header } from "../../components/header/Header";
import { Line } from "../../components/others/Line";
import { PesquisaUsuarioDinamica } from "../../components/others/buscadorUsuarios/PesquisaUsuarioDinamica";
import { useFetch } from "../../hooks/useFetch";
import styles from "./TurmaEdicao.module.css";
import { ListaInscritos } from "./util/ListaInscritos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
const url = import.meta.env.VITE_BASE_URL;

type InscritoTurma = {
    id: number;
    email: string;
    nome: string;
    status: string;
    tipo: string;
    url_imagem: string;
}

type TurmaType = {
    id_turma: number;
    nome: string;
    nome_periodo: string;
    descricao: string;
    data_criacao: string;
    inscritos: InscritoTurma[];
}

export function TurmaEdicao() {

    const [openSucesso, setOpenSucesso] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [turma,setTurma] = useState<TurmaType>();

    const { id } = useParams();


    useEffect(() => {
        axios.get(`${url}/turmas/${id}/inscritos`)
            .then((response) => {
                setTurma(response.data.payload)
            })
            .catch((error) => {
                setOpenErro(true)
                setMensagem(error.response.data.message)
            })
    }, []);

    if(turma && turma.inscritos) {
       let inss =  turma.inscritos;
        //setIncristo(inss)
    }
  

    function adicionarUsuarioNaTurma(idUsuario : number) {
        console.log("turma")

        let inscricao = {
            id: id,
            id_usuario: idUsuario
        }
        
        axios.post(`${url}/turmas/inscricao`, inscricao)
        .then((response) => {
            setOpenSucesso(true)
            setMensagem(response.data.message)

            let inscrito = response.data.payload;

            if(turma && inscrito) {
                turma.inscritos.push(inscrito);
               
            }


        }).catch((error) => {
            setOpenErro(true)

            if (error.response.data.status === 500) {
                setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
            } else {
                setMensagem(error.response.data.message)
            }

        });
        
 
    }

    function removerInscrito(idUsuario : number) {

        axios.delete(`${url}/turmas/${id}/usuario/${idUsuario}`)
        .then((response) => {

            if(response.data.httpCode === 200 && turma) {
                setOpenSucesso(true)
                setMensagem(response.data.message)
                turma.inscritos = turma.inscritos.filter(i => i.id !== idUsuario);

            }


        }).catch((error) => {
            setOpenErro(true)
            if (error.response.data.status === 500) {
                setMensagem(error.response.data.message + " Verifique se preencheu todos os campos corretamente e tente novamente.")
            } else {
                setMensagem(error.response.data.message)
            }

        });
        
    }


    return (
        <div className={styles.turmaEdicao}>
            <Header title={"Turma"} appendTitle="edição" subtitle="Veja o resumo da turma selecionada com seus inscritos" username="Andreia Gomes" />
            <form className={styles.formularioTurma} key={turma ? turma.nome : ""}>
                <InputText typeInput="text" idInput="nomeTurma" valueInput={turma ? turma.nome : ""} edicao={true} styleName={styles.itemFormulario} label="Nome" />
                <InputText typeInput="text" idInput="nomePeriodo" valueInput={turma ? turma.nome_periodo : ""} edicao={false} styleName={styles.itemFormulario} label="Período" />
                <InputText typeInput="text" idInput="descricaoTurma" valueInput={turma ? turma.descricao : ""} edicao={true} styleName={styles.itemFormulario} label="Descrição" />
            </form>
            <Line />
            <div className={styles.blocoPesquisaDinamica}>
            <PesquisaUsuarioDinamica eventoAdicionarUsuario={adicionarUsuarioNaTurma} />
            </div>
            <div className={styles.tituloBotaoInscrito}>
                <h3 className={styles.tituloInscritos}>Docentes</h3>
            </div>
            <ListaInscritos inscritos={turma ? turma.inscritos : []} tipo="DOCENTE" isEdicao={true} eventoDeletarUsuario={removerInscrito}/>
            <div className={styles.tituloBotaoInscrito}>
                <h3 className={styles.tituloInscritos}>Estudantes</h3>
            </div>
            <div className={styles.listaEstudantes}>
            <ListaInscritos inscritos={turma ? turma.inscritos : []} tipo="ESTUDANTE" isEdicao={true} eventoDeletarUsuario={removerInscrito}/>
            </div>
            <div className={styles.listaBotoes}>
            <PageButton nameButton="cancelar" linkButton="/turmas" colorButton="red" />
            <PageButton nameButton="editar" linkButton={""} colorButton="green" />
            </div>
            <Alert variant="standard" severity="success" className={openSucesso ? styles.mostrarAlertaSucesso : styles.naoMostrarAlertaSucesso} onClose={() => { setOpenSucesso(false) }}>{mensagem}</Alert>
            <Alert variant="standard" severity="error" className={openErro ? styles.mostrarAlertaErro : styles.naoMostrarAlertaErro} onClose={() => { setOpenErro(false) }}>{mensagem}</Alert>
        </div>
    );
}