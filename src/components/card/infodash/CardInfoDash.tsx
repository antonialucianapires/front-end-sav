import styles from './CardInfoDash.module.css';

export function CardInfoDash({title = '', value = ''}) {
    return (
        <div className={styles.cardInfo}>
            <p className={styles.cardInfo__title}>{title}</p>
            <p className={styles.cardInfo__value}>{value}</p>
        </div>
    );
}