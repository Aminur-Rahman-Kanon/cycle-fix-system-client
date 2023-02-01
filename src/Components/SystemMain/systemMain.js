import React from 'react';
import { Link } from 'react-router-dom';
import styles from './systemMain.module.css';

const SystemMain = () => {

    const initDate = new Date();

    const date = `${initDate.getDate()}/${initDate.getMonth() + 1}/${initDate.getFullYear()}`;

    return (
        <div className={styles.systemMain}>
            <div className={styles.systemStatusMain}>
                <div className={styles.systemStatus}>
                    <p style={{margin: '10px'}}>System status: Good</p>
                </div>
            </div>
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
                                <div className={styles.notificationTableColumnHeader}><h3>Service</h3></div>
                                <div className={styles.notificationTableColumn}><h3>New</h3></div>
                                <div className={styles.notificationTableColumn}><h3>Total</h3></div>
                                <div className={styles.notificationTableColumn}><h3>Action</h3></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Booking</p></div>
                                <div className={styles.notificationTableColumn}><p>1</p></div>
                                <div className={styles.notificationTableColumn}><p>5</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/booking" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Cams query</p></div>
                                <div className={styles.notificationTableColumn}><p>0</p></div>
                                <div className={styles.notificationTableColumn}><p>1</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/cams-query" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Xiaomi</p></div>
                                <div className={styles.notificationTableColumn}><p>1</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/xiaomi" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Contact</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <div className={styles.notificationTableColumn}><p>7</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/contact-query" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Registred user</p></div>
                                <div className={styles.notificationTableColumn}><p>4</p></div>
                                <div className={styles.notificationTableColumn}><p>10</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/registered-user" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                        <div className={styles.notificationTableRow}>
                            <div className={styles.noticationTableColumns}>
                                <div className={styles.notificationTableColumnHeader}><p>Feedback</p></div>
                                <div className={styles.notificationTableColumn}><p>2</p></div>
                                <div className={styles.notificationTableColumn}><p>20</p></div>
                                <div className={styles.notificationTableColumn}><Link to="/feedback" className={styles.checkLink}>Check</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemMain;
