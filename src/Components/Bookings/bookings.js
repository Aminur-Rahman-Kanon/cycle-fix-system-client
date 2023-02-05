import React, { useEffect, useState, useRef, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './bookings.module.css';
import Spinners from "../Others/Spinners/spinners";
import logo from '../../Assets/logo.png';
import useScanDetection from 'use-scan-detection';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import Modal from "../Others/Modal/modal";
import Backdrop from "../Others/Backdrop/backdrop";
import StatusMsg from "../Others/StatusMsg/statusMsg";


const Bookings = () => {

    const [barcode, setBarcode] = useState('');

    const timeOutRef = useRef(null);

    const documentToPrint = useRef(null);

    const [bookings, setBookings] = useState({});

    const [error, setError] = useState(false);

    const [searchCustomer, setSearchCustomer] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [showOrders, setShowOrders] = useState(false);

    const [orderDetails, setOrderDetails] = useState({});

    const [sliceIndex, setSliceIndex] = useState(null);

    const [actionStatus, setActionStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useScanDetection({
        onComplete: setBarcode,
        minLength: 5
    })

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

    const objKeys = Object.keys(bookings);

    if (!sliceIndex){
        objKeys.map((item, index) => {
            if (new Date().toDateString() === item) {
                setSliceIndex(index);
            }
        })
    }

    const totalPage = Math.ceil(objKeys.length-3);

    let displayService = null;

    const statusStyleHandler = (service) => {
        let statusStyle = null;
        if (service === "Completed"){
            return statusStyle = {
                backgroundColor: '#166c16',
                color: 'white',
                border: '1px solid darkgreen',
                borderRadius: '5px'
            }
        }
        else if (service === 'Processing'){
            return statusStyle = {
                backgroundColor: '#4d74ad',
                color: 'white',
                border: '1px solid #4d74ad',
                borderRadius: '5px'
            }
        }
        else {
            return statusStyle = {
                backgroundColor: '#7575768f',
                color: 'white',
                border: '1px solid transparent',
                borderRadius: '5px'
            }   
        }
    }

    if (objKeys.length > 0 && sliceIndex){
        displayService = objKeys.slice(sliceIndex, sliceIndex + 3).map(day => {
            return <div key={day} className={styles.bookingContainerRow} >
                <div className={styles.bookingContainerHeaderColumn}>
                    <h3 style={{color: 'white'}}>{day}</h3>
                </div>
                <div className={styles.bookingContainerColumns}>
                    {Object.values(bookings[day]).map(date => {
                        const statusStyle = statusStyleHandler(date.status)
                        return <div key={date.authCode} className={styles.bookingContainerColumn}
                                    style={statusStyle}
                                    onClick={() => {
                                        setOrderDetails(date)
                                        setShowOrders(true);
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
    else {
        displayService = <div className={styles.bookingContainerRow} >
            <div className={styles.bookingContainerHeaderColumn}>
                <h3 style={{color: 'white'}}>{new Date().toDateString()}</h3>
            </div>
            <div className={styles.bookingContainerColumns} style={{flexFlow: 'column', justifyContent: 'center', color: 'white'}}>
                <h1>No bookings today</h1>
                <button className={styles.addBookingBtn}>Add booking</button>
            </div>
        </div>
    }

    const closeOrderDetails = () => {
        setShowOrders(false);
    }

    const applyJob = (email) => {
        fetch('https://cycle-fix-system-server.onrender.com/apply-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                status: 'Processing'
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setActionStatus('job applied');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setActionStatus('network error')
            setModal(true);
            setBackdrop(true);
        })
    }

    const completeJob = (email) => {
        fetch('https://cycle-fix-system-server.onrender.com/complete-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                status: 'Completed'
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                console.log(data.status);
                setActionStatus('job completed');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setActionStatus('network error')
            setModal(true);
            setBackdrop(true);
        })
    }

    const deleteJob = (email) => {
        fetch('https://cycle-fix-system-server.onrender.com/delete-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setActionStatus('job deleted');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setActionStatus('network error')
            setModal(true);
            setBackdrop(true);
        })
    }

    const errorHandler = () => {
        setActionStatus('');
        setModal(false);
        setBackdrop(false);
    }

    const OrderDetails = ({showOrders, orderDetails}) => {
        if (!showOrders) return;
        const statusStyle = statusStyleHandler(orderDetails.status)

        return <div className={styles.orderDetailsMain}>
            <div className={styles.orderDetailsContainer} ref={documentToPrint}>
                <img src={logo} alt="cycle fix" style={{width: '100px'}}/>
                <div className={styles.orderDetailsRows}>
                    <div className={styles.orderDetailsRow}>
                        <h4 className={styles.orderDetailsHeaderH4}>Service</h4>
                        <div className={styles.orderDetailsColumns}>
                            <div className={styles.orderDetailsColumn}>
                                <p className={styles.orderDetailsP}>{orderDetails.service}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Date:</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.date}</p>
                            </div>
                            <div className={styles.orderDetailsColumn} style={statusStyle}>
                                <h4 className={styles.orderDetailsH4}>Status:</h4>
                                <p className={styles.orderDetailsP}>{orderDetails.status ? orderDetails.status : 'Pending'}</p>
                            </div>
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
                                <p className={styles.orderDetailsP}>£{orderDetails.deposit || '25'}</p>
                            </div>
                            <div className={styles.orderDetailsColumn}>
                                <h4 className={styles.orderDetailsH4}>Due:</h4>
                                <p className={styles.orderDetailsP}>£{orderDetails.due || '25'}</p>
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

                    <div className={styles.orderDetailsRows} style={{marginTop: '50px'}}>
                        <div>
                            <Barcode value={orderDetails.email} width={1}/>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.btnContainer}>
                <ReactToPrint trigger={() => <button className={styles.printBtn}>Apply job and print</button>}
                              content={() => documentToPrint.current}
                              onAfterPrint={() => applyJob(orderDetails.email) }/>
                <button className={styles.printBtn}
                        onClick={() => completeJob(orderDetails.email) }
                        disabled={orderDetails.status === 'Completed'}
                        >Mark as complete</button>
                <button className={styles.printBtn} onClick={() => deleteJob(orderDetails.email)}>Delete booking</button>
                <button className={styles.printBtn} onClick={() => closeOrderDetails(orderDetails.email) }>Close</button>
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
    
    if (searchCustomer && !noUserFound || barcode){
        searchCustomerDisplay = Object.values(bookings).map(item => Object.values(item).filter(nesItem => nesItem.email === searchCustomer || barcode)).map(result => result.map(el => {
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
        <Backdrop backdrop={backdrop}/>
        <Spinners spinner={ spinner } />
        <Modal modal={modal}>
            <StatusMsg status={actionStatus}
                       jobStatusHandler={ () => window.location.reload() }
                       errorHandler={ errorHandler } />
        </Modal>
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
                    <div className={styles.navigationMain}>
                        <button className={styles.navigationIconContainer}
                                onClick={() => setSliceIndex(sliceIndex -1)}
                                disabled={ sliceIndex <= 1 ? true : false }
                                >
                            <FontAwesomeIcon icon={ faAngleLeft } className={styles.navigationIcon}/>
                        </button>
                        <button className={styles.navigationIconContainer}
                                onClick={() => setSliceIndex(sliceIndex +1)}
                                disabled={sliceIndex === (totalPage -3) ? true : false}
                                >
                            <FontAwesomeIcon icon={ faAngleRight } className={styles.navigationIcon}/>
                        </button>
                    </div>
                    { noUserFound }
                    { searchCustomer ? searchCustomerDisplay : displayService}
                </div>
            </div>
        </div>
        </>
    )
}

export default Bookings;
