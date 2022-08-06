import { Bell } from "phosphor-react";
import { Avatar } from "../avatar/Avatar";
import { Title } from "../others/Title";
import styles from './Header.module.css';

export function Header(props: any) {
    return (
        <header className={styles.header}>
            <div>
            <Title valueTitle={props.title} valueAppend={props.appendTitle}/>
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