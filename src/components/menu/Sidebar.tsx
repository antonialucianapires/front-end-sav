import { Link } from 'react-router-dom';
import styles from '../menu/Sidebar.module.css';
import logo from '../../assets/logo.svg';
import { SidebarData } from './SidebarData';
import { List } from 'phosphor-react';
import { useState } from 'react';

export function Sidebar() {

    const [mostrarMenuResponsivo, setMostrarMenuResponsivo] = useState(false);

    function mostrarMenuResponsivoFunction() {
        if (mostrarMenuResponsivo) {
            setMostrarMenuResponsivo(false)
        } else {
            setMostrarMenuResponsivo(true)
        }
    }

    return (
        <div className={styles.menuSidebar} >
            <List size={30}  className={styles.botaoMenu} onClick={mostrarMenuResponsivoFunction}/>
            <aside className={mostrarMenuResponsivo ? styles.sidebarNone : styles.sidebar}>
            <header className={styles.header}>
                <img src={logo} alt="logotipo da SAV" />
            </header>
            <ul className={styles.sidebarList}>
                {SidebarData.map((value, key) => {
                    return (
                        <li key={key}>
                            <span>{value.icon}</span>
                            <Link to={value.link}>{value.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </aside>
        </div>
    );
}