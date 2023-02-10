import React from "react";
import styles from './systemStatus.module.css';

const systemStatus = ({error}) => {
    return (
        <div className={styles.systemStatusMain} style={ error ? {backgroundColor: 'darkred', border: '1px solid darkred'} : null }>
            <div className={styles.systemStatus}>
                <p style={{margin: '10px'}}>System status: {error ? 'Bad' : 'Good'}</p>
            </div>
        </div>
    )
}

export default systemStatus;
