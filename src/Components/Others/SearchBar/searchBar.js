import React from "react";
import styles from './searchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const searchBar = ({placeholder, searchBarHandler}) => {

    return (
        <div className={styles.searchBarMain}>
            <div className={styles.searchInputContainer}>
                <FontAwesomeIcon icon={ faMagnifyingGlass } className={styles.searchInputIcon} />
                <input type="text"
                        className={styles.searchInput}
                        placeholder={placeholder}
                        onChange={ searchBarHandler }
                        />
            </div>
        </div>
    )
}

export default searchBar;
