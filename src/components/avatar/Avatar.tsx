import styles from './Avatar.module.css';
import semImagem from '../../assets/imagem-usuario.png';

export function Avatar({isMedium = false, urlImagem = semImagem}) {
    return (
        <img className={isMedium ? styles.avatarMedium : styles.avatarSmall} src={urlImagem} />
    );
}