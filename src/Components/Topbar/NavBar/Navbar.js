import React from "react";
import { Link } from 'react-router-dom';
import xiaomi from '../../../Assets/xiaomi.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faPhone, faUsers, faMessage, faCarBurst } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';

const Navbar = () => {

    return (
        <div className={styles.navbarMain}>
            <ul className={styles.navbarListsContainer}>
                <li className={styles.navbarLists}>
                    <Link to="/" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faDesktop } className={styles.navbarListIcon} />
                        <p>Home</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/booking" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faCalendarCheck } className={styles.navbarListIcon} />
                        <p>Bookings</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/contact" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faPhone } className={styles.navbarListIcon} />
                        <p>Contact</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/cams-query" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faCarBurst } className={styles.navbarListIcon} />
                        <p>Cams query</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/xiaomi" className={styles.navbarLink}>
                        <img src={ xiaomi } className={styles.xiamoiImg}/>
                        <p>Xiaomi</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/feedback" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faMessage } className={styles.navbarListIcon} />
                        <p>Feedback</p>
                    </Link>
                </li>
                <li className={styles.navbarLists}>
                    <Link to="/registered-user" className={styles.navbarLink}>
                        <FontAwesomeIcon icon={ faUsers } className={styles.navbarListIcon} />
                        <p>Registered users</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
