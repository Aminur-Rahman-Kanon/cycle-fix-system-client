import React, { useContext } from 'react';
import { DataContainer } from '../../App';
import { Link } from 'react-router-dom';
import styles from './systemMain.module.css';

const SystemMain = () => {

    const data = useContext(DataContainer);

    const initDate = new Date();

    const date = `${initDate.getDate()}/${initDate.getMonth() + 1}/${initDate.getFullYear()}`;

    return (
        <div className={styles.systemMain}>
            <div className={styles.systemMainContainerMain}>
                <h1 className={styles.systemMainContainerH1}>System Main</h1>
                <div className={styles.systemMainWelcomeMsgMain}>
                    <h2>Welcome!</h2>
                    <div className={styles.systemMainWelcomeMsgContainer}>
                        <h3>Today: {date} </h3>
                    </div>
                </div>

                <div className={styles.notificationTableMain}>
                    <div className={styles.notificationTable}>
                        <div className={styles.noticationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><h3 style={{margin: '15.75px 0'}}>Service</h3></div>
                                <div className={styles.notificationTableColumn}><h3>Today</h3></div>
                                <div className={styles.notificationTableColumn}><h3>Total</h3></div>
                                <div className={styles.notificationTableColumn}><h3>Action</h3></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Booking</p></div>
                                <div className={styles.notificationTableColumn}><p>{data.todayCount}</p></div>
                                <div className={styles.notificationTableColumn}><p>{data.bookingCount}</p></div>
                                <Link to="/booking" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Cams query</p></div>
                                <div className={styles.notificationTableColumn}><p>N/A</p></div>
                                <div className={styles.notificationTableColumn}><p>{data.camsCount}</p></div>
                                <Link to="/cams-query" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Xiaomi</p></div>
                                <div className={styles.notificationTableColumn}><p>1</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <Link to="/xiaomi" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Contact</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <div className={styles.notificationTableColumn}><p>7</p></div>
                                <Link to="/contact-query" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Registred user</p></div>
                                <div className={styles.notificationTableColumn}><p>4</p></div>
                                <div className={styles.notificationTableColumn}><p>10</p></div>
                                <Link to="/registered-user" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Feedback</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <div className={styles.notificationTableColumn}><p>20</p></div>
                                <Link to="/feedback" className={styles.notificationTableColumn}>Check</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemMain;
