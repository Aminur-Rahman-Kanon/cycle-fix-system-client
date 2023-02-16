import React, { useEffect, useState } from "react";
import styles from './addCamsBooking.module.css';
import cams from '../../../Assets/cams.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Spinners from "../../Others/Spinners/spinners";
import Backdrop from "../../Others/Backdrop/backdrop";
import Modal from "../../Others/Modal/modal";

const AddCamsBooking = () => {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');

    const [message, setMessage] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [status, setStatus] = useState('');

    useEffect(() => {
        if (name && email && phone && message){
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [name, email, phone, message])

    const submitFormHandler = (e) => {
        e.preventDefault();
        setSpinner(true);

        fetch('https://cycle-fix-system-server.onrender.com/add-cams-bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setSpinner(false);
                setStatus(data.status);
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'error'){
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else {
                setSpinner(false);
                setStatus('network error')
                setBackdrop(true);
                setModal(true);
            }
        })

    }

    const errorHandler = () => {
        setStatus('');
        setModal(false);
        setBackdrop(false);
    }

    let statusMsgDisplay = null;

    if (status === 'success'){
        statusMsgDisplay = <div className={styles.statusMsgMain}>
            <h2>Booking added</h2>
            <p>System updated</p>
            <button className={styles.statusMsgBtn} onClick={() => window.location.href = '/'}>Ok</button>
        </div>
    }
    else if(status === 'error'){
        statusMsgDisplay = <div className={styles.statusMsgMain}>
            <h2>Someting went wrong</h2>
            <p>Please try again</p>
            <button className={styles.statusMsgBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }
    else if (status === 'network error') {
        statusMsgDisplay = <div className={styles.statusMsgMain}>
            <h2>Network error</h2>
            <p>Please check internet connection</p>
            <button className={styles.statusMsgBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }

    return (
        <>
        <Spinners spinner={spinner} />
        <Backdrop backdrop={backdrop} />
        <Modal modal={modal}>
            {statusMsgDisplay}
        </Modal>
        <div className={styles.camsBookingMain}>
            <h1 style={{color: '#7db2ed', letterSpacing: '1px'}}>Add new Cams booking</h1>
            <div className={styles.camsBookingFormContainer}>
                <div className={styles.camsBookingFormMain}>
                    <div className={styles.camsBookingBg}>
                        <img src={cams} className={styles.camsImg} />
                    </div>
                    <form className={styles.camsBookingForm}>
                        <div className={styles.bookingFormInputContainer}>
                            <input type="text"
                                className={styles.bookingFormInput}
                                placeholder="Full name"
                                onChange={(e) => setName(e.target.value)}/>
                            <FontAwesomeIcon icon={ faSignature } className={styles.bookingFormIcon} />
                        </div>
                        <div className={styles.bookingFormInputContainer}>
                            <input type="email"
                                className={styles.bookingFormInput}
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}/>
                            <FontAwesomeIcon icon={ faAt } className={styles.bookingFormIcon} />
                        </div>
                        <div className={styles.bookingFormInputContainer}>
                            <input type="number"
                                className={styles.bookingFormInput}
                                placeholder="Phone number"
                                onChange={(e) => setPhone(e.target.value)}/>
                            <FontAwesomeIcon icon={ faPhone } className={styles.bookingFormIcon} />
                        </div>
                        <div className={styles.bookingFormTextContainer}>
                            <textarea type="text"
                                rows="5"
                                className={styles.bookingFormTextarea}
                                placeholder="Message"
                                onChange={(e) => setMessage(e.target.value)}/>
                            <FontAwesomeIcon icon={ faEnvelope } className={styles.bookingFormIcon} style={{paddingTop:'10px'}}/>
                        </div>
                        <button disabled={btnDisable} className={styles.addBookingBtn} onClick={ submitFormHandler }>Add booking</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddCamsBooking;
