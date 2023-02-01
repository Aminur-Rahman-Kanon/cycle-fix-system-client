import React, { useEffect, useState } from "react";
import styles from './bookings.module.css';

const Bookings = () => {

    const [bookings, setBookings] = useState({});

    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('https://cycle-fix-system-server.onrender.com/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setBookings(data.data)).catch(err => setError(true));
    }, [])

    let displayService = null;

    if (Object.keys(bookings).length > 0){
        displayService = Object.keys(bookings).map(day => {
            return <div key={day} className={styles.bookingContainerRow}>
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{day}</h3>
                </div>
                <div className={styles.bookingContainerColumns}>
                    {Object.values(bookings[day]).map(date => {
                        return <div key={date.authCode} className={styles.bookingContainerColumn}>
                            <h4 className={styles.bookingContainerH4}>Service</h4> 
                            <p style={{margin: '5px', fontWeight: '600'}}>{date.service}</p>
                            <p className={styles.bookingContainerP}>{`Date: ${date.date}`}</p>
                            <p className={styles.bookingContainerP}>{`Auth code: ${date.authCode}`}</p>
                            <h4 className={styles.bookingContainerH4}>Bike details</h4>
                            <p className={styles.bookingContainerP}>{`Make: ${date.bikeDetails.make}`}</p>
                            <p className={styles.bookingContainerP}>{`Model: ${date.bikeDetails.model}`}</p>
                            <p className={styles.bookingContainerP}>{`Color: ${date.bikeDetails.color}`}</p>
                            <p className={styles.bookingContainerP}>{`Additional cost: ${date.bikeDetails.additionalCost}`}</p>
                            <h4 className={styles.bookingContainerH4}>Customer</h4>
                            <p className={styles.bookingContainerP}>{`Name: ${date.firstName} ${date.lastName}`}</p>
                            <p className={styles.bookingContainerP}>{`Email: ${date.email}`}</p>
                            <p className={styles.bookingContainerP}>{`Phone: ${date.phone}`}</p>
                        </div>
                    })}
                </div>
            </div>
        })
    }

    return (
        <div className={styles.bookingMain}>
            <h1 style={{color: '#7db2ed'}}>Bookings</h1>
            
            <div className={styles.bookingContainerMain}>
                <div className={styles.bookingContainer}>
                    {displayService}
                </div>
            </div>
        </div>
    )
}

export default Bookings;
