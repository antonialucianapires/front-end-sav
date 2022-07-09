import styles from './PageButton.module.css';
import { Link } from "react-router-dom";

type PageButtonData = {
    linkButton: string;
    nameButton: string;
    colorButton: string;
}

export function PageButton(pageButton : PageButtonData) {

    let styleButton = styles.colorButtonDefault;

    switch(pageButton.colorButton) {
        case 'blue':
            styleButton = styles.colorButtonBlue;
            break;
        case 'red':
            styleButton = styles.colorButtonRed;
            break;
        case 'green':
            styleButton = styles.colorButtonGreen;
            break;
    }


    return (
        <Link className={styleButton} to={pageButton.linkButton}>{pageButton.nameButton}</Link>
    )
}