import { Bell } from "phosphor-react";
import { Avatar } from "../avatar/Avatar";
import styles from './Header.module.css';

export function Header(props: any) {
    return (
        <header className={styles.header}>
            <div>
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
            </div>
            <div className={styles.infoHeader}>
                <Bell color="var(--blue-500)" />
                <span></span>
                <p>{props.username}</p>
                <Avatar />
            </div>
        </header>
    )
}