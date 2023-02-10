import React, { useRef } from "react";
import styles from './displayOrderDetails.module.css';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import logo from '../../../Assets/logo.png';

const DisplayOrderDetails = ({showOrders, orderDetails, applyJob, completeJob, deleteJob, closeOrderDetails, statusStyleHandle}) => {
    const documentToPrint = useRef(null);

    if (!showOrders) return;
    const statusStyle = statusStyleHandle(orderDetails.status)

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

export default DisplayOrderDetails;
