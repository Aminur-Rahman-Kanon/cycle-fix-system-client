import React, { useEffect, useState, useRef, useContext } from "react";
import { DataContainer } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './bookings.module.css';
import Spinners from "../Others/Spinners/spinners";
import useScanDetection from 'use-scan-detection';
import Modal from "../Others/Modal/modal";
import Backdrop from "../Others/Backdrop/backdrop";
import StatusMsg from "../Others/StatusMsg/statusMsg";
import { Link, useParams } from "react-router-dom";
import DisplayBooking from "./DisplayBooking/displayBooking";
import DisplayOrderDetails from "./DisplayOrderDetails/displayOrderDetails";
import SearchCustomer from "./SearchCustomer/searchCustomer";


const Bookings = () => {

    const data = useContext(DataContainer);

    const emailQuery = useParams();

    const [barcode, setBarcode] = useState('');

    const timeOutRef = useRef(null);

    const [bookings, setBookings] = useState({});

    const [searchCustomer, setSearchCustomer] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [showOrders, setShowOrders] = useState(false);

    const [orderDetails, setOrderDetails] = useState({});

    const [sliceIndex, setSliceIndex] = useState(0);

    const [actionStatus, setActionStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [bookingFound, setBookingFound] = useState(false);

    useScanDetection({
        onComplete: setBarcode,
        minLength: 5
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        setBookings(data.bookings);
    }, [])

    useEffect(() => {
        return () => clearTimeout(timeOutRef.current)
    }, [ searchCustomer ])

    const objKeys = Object.keys(bookings);

    if (!sliceIndex && !bookingFound){
        objKeys.map((item, index) => {
            if (new Date().toDateString() === item) {
                setSliceIndex(index);
                setBookingFound(true);
            }
        })
    }

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

    const closeOrderDetails = () => {
        setShowOrders(false);
    }

    const applyJob = async (email) => {
        setSpinner(true);
        await fetch('https://cycle-fix-system-server.onrender.com/apply-job', {
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
                setSpinner(false);
                setActionStatus('job applied');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setSpinner(false);
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setSpinner(false);
            setActionStatus('network error')
            setModal(true);
            setBackdrop(true);
        })
    }

    const completeJob = async (email) => {
        setSpinner(true);
        await fetch('https://cycle-fix-system-server.onrender.com/complete-job', {
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
                setSpinner(false);
                setActionStatus('job completed');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setSpinner(false);
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setSpinner(false);
            setActionStatus('network error')
            setModal(true);
            setBackdrop(true);
        })
    }

    const deleteJob = async (email) => {
        setSpinner(true);
        await fetch('https://cycle-fix-system-server.onrender.com/delete-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setSpinner(false);
                setActionStatus('job deleted');
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setSpinner(false);
                setActionStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setSpinner(false);
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
    
    const searchCustomerHandler = (e) => {
        timeOutRef.current = setTimeout(() => {
            setSearchCustomer(e.target.value);
        }, 1500)
    }

    console.log(barcode);
    
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
            <DisplayOrderDetails showOrders={showOrders}
                                 orderDetails={orderDetails}
                                 closeOrderDetails={closeOrderDetails}
                                 applyJob={applyJob}
                                 completeJob={completeJob}
                                 deleteJob={deleteJob}
                                 statusStyleHandle={statusStyleHandler}/>
            <h1 style={{color: '#7db2ed'}}>Bookings</h1>

            <div className={styles.addBookingMain}>
                <Link to='/add-booking' className={styles.addBookingContainer}>
                    <FontAwesomeIcon icon={ faPlus } className={styles.addBookingIcon}/>
                    <p>Add Booking</p>
                </Link>
            </div>

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
                                disabled={ sliceIndex <= 0 ? true : false }>
                            <FontAwesomeIcon icon={ faAngleLeft } className={styles.navigationIcon}/>
                        </button>
                        <button className={styles.navigationIconContainer}
                                onClick={() => setSliceIndex( sliceIndex + 1 )}
                                disabled={sliceIndex + 1 === objKeys.length}
                                >
                            <FontAwesomeIcon icon={ faAngleRight } className={styles.navigationIcon}/>
                        </button>
                    </div>
                    {searchCustomer ? <SearchCustomer bookings={bookings}
                                                       searchCustomer={searchCustomer}
                                                       barcode={barcode}
                                                       orderDetails={setOrderDetails}
                                                       showOrders={setShowOrders}/>
                    : 
                    <DisplayBooking bookingObj={bookings}
                                    sliceIndex={ sliceIndex }
                                    bookingFound={ bookingFound }
                                    showOrders={setShowOrders}
                                    orderDetails={setOrderDetails}
                                    statusStyleHandle={statusStyleHandler}
                                    emailQuery={emailQuery}/>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Bookings;
