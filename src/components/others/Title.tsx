import styles from "./Title.module.css";

type TitleH1 = {
     valueTitle: string;
}

export function Title(title: TitleH1) {
    return <h1 className={styles.title}>{title.valueTitle}</h1>
}