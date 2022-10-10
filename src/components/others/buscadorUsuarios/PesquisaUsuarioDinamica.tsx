import { Octagon, X } from 'phosphor-react';
import { useState } from 'react';
import { ItemResultado } from './ItemResultado';
import styles from './PesquisaUsuarioDinamica.module.css';
const url = import.meta.env.VITE_BASE_URL;

type UsuarioType = {
    id: number;
    nome: string;
    matricula: string;
    tipo: string;
}

export function PesquisaUsuarioDinamica(props : any) {

    const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        event.preventDefault();
        const valorInput = event.target.value;
     
        
        if(!valorInput) {
            setUsuarios([]);
            return;
        };

        let regex = new RegExp("[0-9]+");

        if(regex.test(valorInput)) {

            fetch(`${url}/usuarios?tipoUsuario=ADMIN&statusUsuario=ATIVO&matricula=${valorInput}`)
            .then((response) => response.json()
            .then((r) => {
                setUsuarios(r.payload.content)
            }));

            console.log("somente numero: " + valorInput)
        } else {
            fetch(`${url}/usuarios?tipoUsuario=ADMIN&statusUsuario=ATIVO&nome=${valorInput}`)
            .then((response) => response.json()
            .then((r) => {
                setUsuarios(r.payload.content)
            }));
        }
    } 

    function selecionarUsuarioPesquisa(usuarioId : number)  {
        setUsuarios([])
        props.eventoAdicionarUsuario(usuarioId);
       }

    return (
        <div className={styles.blocoPesquisa}>
            <header>
            <label>Pesquise por docentes ou estudantes e selecione para adicionar na turma </label>
            </header>
            <input className={styles.inputUsuario} name="pesquisadorDinamico" type={"text"} onChange={handleInputChange} placeholder="Escreva o nome ou matrícula de docente ou estudante" />
            <div className={styles.resultados}>
              {usuarios.map(usuario => {
                return  <ItemResultado id={usuario.id} nome={usuario.nome} tipo={usuario.tipo} key={usuario.id} eventoSelecionar={selecionarUsuarioPesquisa}/>
              })}
            </div>
        </div>

    );
}