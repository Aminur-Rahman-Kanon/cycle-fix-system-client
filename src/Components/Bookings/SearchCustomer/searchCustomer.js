import React, { useEffect, useState } from "react";
import styles from '../DisplayBooking/displayBooking.module.css';

const SearchCustomer = ({bookings, searchCustomer, barcode, orderDetails, showOrders}) => {

    const [bookingFound, setBookingFound] = useState([]);

    useEffect(() => {
        if (searchCustomer || barcode){
            Object.values(bookings).map(item => Object.values(item).map(nesItem => {
                if (nesItem.email === searchCustomer || barcode) {
                    setBookingFound(oldItem => [...oldItem, nesItem])
                }
            }));
        }

        return () => setBookingFound([]);
    }, [searchCustomer, barcode])

    let result = null;
    
    if (bookingFound.length > 0){
        result = bookingFound.map(result => {
            return <div key={result._id} className={styles.bookingContainerRow}>
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{result.date}</h3>
                </div>
                <div className={styles.bookingContainerColumns}>
                    <div className={styles.bookingContainerColumn} onClick={() => {
                        orderDetails(result);
                        showOrders(true);
                    }}>
                        <h4 className={styles.bookingContainerH4}>Service</h4> 
                        <p style={{margin: '5px', fontWeight: '600'}}>{result.service}</p>
                        <p className={styles.bookingContainerP}>{`Date: ${result.date}`}</p>
                        <p className={styles.bookingContainerP}>{`Auth code: ${result.authCode}`}</p>
                        <h4 className={styles.bookingContainerH4}>Bike details</h4>
                        <p className={styles.bookingContainerP}>{`Make: ${result.bikeDetails.make}`}</p>
                        <p className={styles.bookingContainerP}>{`Model: ${result.bikeDetails.model}`}</p>
                        <p className={styles.bookingContainerP}>{`Color: ${result.bikeDetails.color}`}</p>
                        <p className={styles.bookingContainerP}>{`Additional cost: ${result.bikeDetails.additionalCost}`}</p>
                        <h4 className={styles.bookingContainerH4}>Customer</h4>
                        <p className={styles.bookingContainerP}>{`Name: ${result.firstName} ${result.lastName}`}</p>
                        <p className={styles.bookingContainerP}>{`Email: ${result.email}`}</p>
                        <p className={styles.bookingContainerP}>{`Phone: ${result.phone}`}</p>
                    </div>
                </div>
            </div>
        })
    }
    else {
        result = <div className={styles.bookingContainerRow} style={{padding: '35px'}}>
            <h1 style={{color: 'white'}}>Nothing found</h1>
        </div>;
    }

    return result;
}

export default SearchCustomer;
