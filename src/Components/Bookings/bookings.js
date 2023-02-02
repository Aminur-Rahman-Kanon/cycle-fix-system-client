import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './bookings.module.css';
import Spinners from "../Others/Spinners/spinners";

const Bookings = () => {

    const timeOutRef = useRef(null);

    const [bookings, setBookings] = useState({});

    const [error, setError] = useState(false);

    const [searchCustomer, setSearchCustomer] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [showOrders, setShowOrders] = useState(false);

    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        setSpinner(true)
        fetch('https://cycle-fix-system-server.onrender.com/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            setSpinner(false);
            setBookings(data.data);
        }).catch(err => {
            setSpinner(false);
            setError(true);
        });
    }, [])

    useEffect(() => {
        return () => clearTimeout(timeOutRef.current)
    }, [ searchCustomer ])

    let displayService = null;

    if (Object.keys(bookings).length > 0){
        displayService = Object.keys(bookings).map(day => {
            return <div key={day} className={styles.bookingContainerRow}>
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{day}</h3>
                </div>
                <div className={styles.bookingContainerColumns}>
                    {Object.values(bookings[day]).map(date => {
                        return <div key={date.authCode} className={styles.bookingContainerColumn} onClick={() => {
                            setOrderDetails(date)
                            setShowOrders(true);
                        }}>
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

    const closeOrderDetails = () => {
        setShowOrders(false);
    }

    const OrderDetails = ({showOrders, orderDetails}) => {
        
        if (!showOrders) return;

        return <div className={styles.orderDetailsMain}>
            <div className={styles.orderDetailsContainer}>
                <div className={styles.orderDetailsRows}>
                    <div className={styles.orderDetailsRow}>
                        <h4 className={styles.orderDetailsHeaderH4}>Service: {orderDetails.service}</h4>
                        <div className={styles.orderDetailsColumn}>
                            <h4 className={styles.orderDetailsH4}>Date:</h4>
                            <p className={styles.orderDetailsP}>{orderDetails.date}</p>
                        </div>
                    </div>
                    <div className={styles.orderDetailsRow}>
                        <h4 className={styles.orderDetailsHeaderH4}>Payment Details</h4>
                        <div className={styles.orderDetailsColumns}>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Total Price:</h4>
                                <p className={styles.orderDetailsP}>{`£${orderDetails.totalPrice}`}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Package price:</h4>
                                <p className={styles.orderDetailsP}>£{orderDetails.packagePrice}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Additional cost:</h4>
                                <p className={styles.orderDetailsP}>£{orderDetails.bikeDetails.additionalCost}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Paid:</h4>
                                <p className={styles.orderDetailsP}>£25</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Due:</h4>
                                <p className={styles.orderDetailsP}>£25</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.orderDetailsRows}>
                    <div className={styles.orderDetailsRow}>
                        <h4 className={styles.orderDetailsHeaderH4}>Bike details</h4>
                        <div className={styles.orderDetailsColumns}>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Make:</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.bikeDetails['make']}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Model:</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.bikeDetails.model}</p>
                            </div><div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Color:</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.bikeDetails.color}</p>
                            </div><div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Additional info:</h4>
                                <p className={styles.orderDetailsP}>N/A</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderDetailsRow}>
                        <h4 className={styles.orderDetailsHeaderH4}>Customer Details</h4>
                        <div className={styles.orderDetailsColumns}>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Name</h4>
                                <p className={styles.orderDetailsP}>{`${orderDetails.firstName} ${orderDetails.lastName}`}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Email</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.email}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Phone</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.phone}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.btnContainer}>
                    <button className={styles.printBtn} onClick={ closeOrderDetails }>Close</button>
                    <button className={styles.printBtn}>Print</button>

                </div>
            </div>
        </div>
    }
    
    const searchCustomerHandler = (e) => {
        timeOutRef.current = setTimeout(() => {
            setSearchCustomer(e.target.value);
        }, 1500)
    }
    let noUserFound = null;

    let searchCustomerDisplay = null;
    
    if (searchCustomer && !noUserFound){
        searchCustomerDisplay = Object.values(bookings).map(item => Object.values(item).filter(nesItem => nesItem.email === searchCustomer)).map(result => result.map(el => {
            return <div key={el.authCode} className={styles.bookingContainerRow}>
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{el.date}</h3>
                </div>
                <div className={styles.bookingContainerColumns}>
                    <div className={styles.bookingContainerColumn} onClick={() => {
                        setOrderDetails(el);
                        setShowOrders(true);
                    }}>
                        <h4 className={styles.bookingContainerH4}>Service</h4> 
                        <p style={{margin: '5px', fontWeight: '600'}}>{el.service}</p>
                        <p className={styles.bookingContainerP}>{`Date: ${el.date}`}</p>
                        <p className={styles.bookingContainerP}>{`Auth code: ${el.authCode}`}</p>
                        <h4 className={styles.bookingContainerH4}>Bike details</h4>
                        <p className={styles.bookingContainerP}>{`Make: ${el.bikeDetails.make}`}</p>
                        <p className={styles.bookingContainerP}>{`Model: ${el.bikeDetails.model}`}</p>
                        <p className={styles.bookingContainerP}>{`Color: ${el.bikeDetails.color}`}</p>
                        <p className={styles.bookingContainerP}>{`Additional cost: ${el.bikeDetails.additionalCost}`}</p>
                        <h4 className={styles.bookingContainerH4}>Customer</h4>
                        <p className={styles.bookingContainerP}>{`Name: ${el.firstName} ${el.lastName}`}</p>
                        <p className={styles.bookingContainerP}>{`Email: ${el.email}`}</p>
                        <p className={styles.bookingContainerP}>{`Phone: ${el.phone}`}</p>
                    </div>
                </div>
            </div>
        }))
    }

    if (searchCustomerDisplay){
        const found = searchCustomerDisplay.filter(item => item.length > 0)
        if (found.length <= 0){
            noUserFound = <div className={styles.bookingContainerRow}>
                <h1 style={{color: 'white'}}>Nothing found</h1>
            </div>
        }
    }
    
    return (
        <>
        <Spinners spinner={ spinner } />
        <div className={styles.bookingMain}>
            <OrderDetails showOrders={showOrders} orderDetails={orderDetails}/>
            <h1 style={{color: '#7db2ed'}}>Bookings</h1>

            <div className={styles.searchBarMain}>
                <div className={styles.searchInputContainer}>
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className={styles.searchInputIcon} />
                    <input type="text"
                           className={styles.searchInput}
                           placeholder="Search Customer"
                           onChange={ searchCustomerHandler }
                           />
                </div>
            </div>
            
            <div className={styles.bookingContainerMain}>
                <div className={styles.bookingContainer}>
                    { noUserFound }
                    { searchCustomer ? searchCustomerDisplay : displayService}
                </div>
            </div>
        </div>
        </>
    )
}

export default Bookings;
