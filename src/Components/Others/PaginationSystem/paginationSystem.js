import React from "react";
import styles from './paginationSystem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const paginationSystem = ({increment, decrement, incrementDisable, decrementDisable}) => {

    return (
        <div className={styles.navigationMain}>
            <button className={styles.navigationIconContainer}
                    onClick={ decrement }
                    disabled={ decrementDisable }>
                <FontAwesomeIcon icon={ faAngleLeft } className={styles.navigationIcon}/>
            </button>
            <button className={styles.navigationIconContainer}
                    onClick={ increment }
                    disabled={ incrementDisable }
                    >
                <FontAwesomeIcon icon={ faAngleRight } className={styles.navigationIcon}/>
            </button>
        </div>
    )
}

export default paginationSystem;
