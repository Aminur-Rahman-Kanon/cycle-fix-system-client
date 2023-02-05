import React from "react";
import styles from './statusMsg.module.css';

const statusMsg = ({ status,jobStatusHandler, errorHandler }) => {

    let msgToDisplay = null;

    if (status === 'job applied') {
        msgToDisplay = <div className={styles.msgToDisplayMain}>
            <h2>Job status updated to Processing</h2>
            <h3>Good luck</h3>
            <button className={styles.msgToDisplayBtn} onClick={ jobStatusHandler }>Ok</button>
        </div>
    }
    else if (status === 'job completed') {
        msgToDisplay = <div className={styles.msgToDisplayMain}>
            <h2>Job status updated to completed</h2>
            <h3>Nice work</h3>
            <button className={styles.msgToDisplayBtn} onClick={ jobStatusHandler }>Ok</button>
        </div>
    }
    else if (status === 'job deleted') {
        msgToDisplay = <div className={styles.msgToDisplayMain}>
            <h2>Job deleted from the database</h2>
            <h3>System updated</h3>
            <button className={styles.msgToDisplayBtn} onClick={ jobStatusHandler }>Ok</button>
        </div>
    }
    else if (status === 'error') {
        msgToDisplay = <div className={styles.msgToDisplayMain}>
            <h2>Something went wrong with the database</h2>
            <h3>Contact system developer</h3>
            <button className={styles.msgToDisplayBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }
    else {
        msgToDisplay = <div className={styles.msgToDisplayMain}>
            <h2>Network error</h2>
            <h3>Check internet connection</h3>
            <button className={styles.msgToDisplayBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }

    return msgToDisplay;
}

export default statusMsg;
