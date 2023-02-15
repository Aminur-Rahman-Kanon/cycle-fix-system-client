import React from "react";
import styles from './displayBooking.module.css';
import { Link } from 'react-router-dom';

const displayBooking = ({ bookingObj, sliceIndex, bookingFound, orderDetails, showOrders, statusStyleHandle, emailQuery }) => {
    let displayService = null;

    const bookingObjKeys = Object.keys(bookingObj);

    console.log(sliceIndex);

    if (emailQuery.hasOwnProperty('email')){
        if (Object.keys(bookingObj).length > 0){
            displayService = Object.values(bookingObj).map(obj => {
                return Object.values(obj).filter(email => email.email === emailQuery.email).map(item => {
                    const statusStyle = statusStyleHandle(item.status)
                    return <div key={item._id} className={styles.bookingContainerRow} >
                        <div className={styles.bookingContainerHeaderColumn}>
                            <h3 style={{color: 'white'}}>{item.Date}</h3>
                        </div>
                        <div className={styles.bookingContainerColumns}>
                            <div className={styles.bookingContainerColumn}
                                        style={statusStyle}
                                        onClick={() => {
                                            orderDetails(item);
                                            showOrders(true);
                                        }}>
                                <p style={{margin: '5px', fontWeight: '600'}}>{item.service}</p>
                                <p className={styles.bookingContainerP}>{`Date: ${item.date}`}</p>
                                <p className={styles.bookingContainerP}>{`Auth code: ${item.authCode}`}</p>
                                <h4 className={styles.bookingContainerH4}>Bike details</h4>
                                <p className={styles.bookingContainerP}>{`Make: ${item.bikeDetails.make}`}</p>
                                <p className={styles.bookingContainerP}>{`Model: ${item.bikeDetails.model}`}</p>
                                <p className={styles.bookingContainerP}>{`Color: ${item.bikeDetails.color}`}</p>
                                <p className={styles.bookingContainerP}>{`Additional cost: ${item.bikeDetails.additionalCost}`}</p>
                                <h4 className={styles.bookingContainerH4}>Customer</h4>
                                <p className={styles.bookingContainerP}>{`Name: ${item.firstName} ${item.lastName}`}</p>
                                <p className={styles.bookingContainerP}>{`Email: ${item.email}`}</p>
                                <p className={styles.bookingContainerP}>{`Phone: ${item.phone}`}</p>
                                <p className={styles.bookingContainerP} >Status: {item.status ? item.status : 'Pending'}</p>
                            </div>
                        </div>
                    </div>
                })
            })
        }
    }
    else {
        if (!bookingFound && !sliceIndex){
            displayService = <div className={styles.bookingContainerRow} >
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{new Date().toDateString()}</h3>
                </div>
                <div className={styles.bookingContainerColumns} style={{flexFlow: 'column', justifyContent: 'center', color: 'white'}}>
                    <h1>No bookings today</h1>
                    <Link to="/add-booking" className={styles.addBookingBtn}>Add booking</Link>
                </div>
            </div>
        }
        else {
            displayService = bookingObjKeys.slice(sliceIndex, sliceIndex+1).map(day => {
                return <div key={day} className={styles.bookingContainerRow} >
                    <div className={styles.bookingContainerHeaderColumn}>
                        <h3 style={{color: 'white'}}>{day}</h3>
                    </div>
                    <div className={styles.bookingContainerColumns}>
                        {Object.values(bookingObj[day]).map(date => {
                            const statusStyle = statusStyleHandle(date.status)
                            return <div key={date._id} className={styles.bookingContainerColumn}
                                        style={statusStyle}
                                        onClick={() => {
                                            orderDetails(date)
                                            showOrders(true);
                                        }}>
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
                                <p className={styles.bookingContainerP} >Status: {date.status ? date.status : 'Pending'}</p>
                            </div>
                        })}
                    </div>
                </div>
            })
        }
    }

    console.log(sliceIndex);

    return displayService;
}

export default displayBooking;
