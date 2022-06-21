import styles from '../menu/Sidebar.module.css';
import logo from '../../assets/logo.svg';
import { SidebarData } from './SidebarData';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <header className={styles.header}>
                <img src={logo} alt="logotipo da SAV" />
            </header>
            <ul className={styles.sidebarList}>
                {SidebarData.map((value, key) => {
                    return (
                        <li key={key}>
                            <span>{value.icon}</span>
                            <a href={value.link}>{value.title}</a>
                        </li>
                    )
                })}
            </ul>
        </aside>
    );
}