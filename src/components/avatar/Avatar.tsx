import styles from './Avatar.module.css';

export function Avatar() {
    return (
        <img className={styles.avatar} src="https://images.unsplash.com/photo-1530785602389-07594beb8b73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibGFja3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
    );
}