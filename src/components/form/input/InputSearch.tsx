import { MagnifyingGlass } from 'phosphor-react';
import styles from './InputSearch.module.css';

export function InputSearch(props : any) {
    return (
        <div className={styles.formInputSearch}>
        <MagnifyingGlass size={24} />
        <input className={styles.inputSearch} type="text" name={props.inputName} placeholder={props.messagePlaceholder} />
        </div>
    );
}