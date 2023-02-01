import React from "react";
import Navbar from "./NavBar/Navbar";
import logo from '../../Assets/logo.png';
import styles from './topbar.module.css';

const Topbar = () => {

    return (
        <div className={styles.topbarMain}>
            <div className={styles.logoContainer}>
                <img src={ logo } className={styles.logo}/>
            </div>

            <div className={styles.topbarNavbar}>
                <Navbar />
            </div>

        </div>
    )
}

export default Topbar;
