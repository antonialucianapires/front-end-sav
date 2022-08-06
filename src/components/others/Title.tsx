import styles from "./Title.module.css";

type TitleH1 = {
     valueTitle: string;
     valueAppend?: string;
}

export function Title(title: TitleH1) {
    return <h1 className={styles.title}>{title.valueTitle}<span className={title.valueAppend ? styles.append : styles.notAppend}>{title.valueAppend}</span></h1>
}