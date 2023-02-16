import React, { useEffect, useState } from "react";
import xiaomi from '../../../Assets/xiaomi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './addXiaomiBooking.module.css';
import Backdrop from "../../Others/Backdrop/backdrop";
import Modal from "../../Others/Modal/modal";

const AddXiaomiBooking = () => {

    const [service, setService] = useState('');

    const [date, setDate] = useState('');

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (service && date && name && email && phone){
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [service, date, name, email, phone])

    const submitFormHandler = (e) => {
        e.preventDefault();

        fetch('https://cycle-fix-system-server.onrender.com/add-xiaomi-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service, date, name, email, phone
            })
        }).then(res => res.json()).then(data => {
            setStatus(data.status);
            setModal(true);
            setBackdrop(true);
        }).catch(err => {
            setStatus('error');
            setModal(true);
            setBackdrop(true);
        })
    }

    let displayStatus = null;

    if (status === 'success'){
        displayStatus = <div className={styles.displayMsgMain}>
            <h2>Booking added</h2>
            <p>System updated</p>
            <button className={styles.displayMsgBtn} onClick={() => window.location.href = "/"}>Ok</button>
        </div>
    }
    else {
        displayStatus = <div className={styles.displayMsgMain}>
            <h2>Something went wrong</h2>
            <p>Please try again</p>
            <button className={styles.displayMsgBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setBackdrop(false);
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={backdrop}/>
        <div className={styles.xiaomiBookingMain}>
            <Modal modal={modal}>
                {displayStatus}
            </Modal>
            <h1 style={{color: '#7db2ed', letterSpacing: '1px'}}>Add new xiaomi booking</h1>
            <div className={styles.xiaomiBookingContainer}>
                <div className={styles.xiaomiBookingBg}>
                    <img src={xiaomi} className={styles.xiaomiImg}/>
                </div>
                <form className={styles.xiaomiBookingForm}>
                    <div className={styles.xiaomiBookingFormContainer} style={{border: 'none'}}>
                        <select defaultValue="Select an option" 
                                onChange={(e) => setService(e.target.value)}
                                className={styles.xiaomiSelect}>
                            <option disabled>Select an option</option>
                            <option>Brake adjustment</option>
                            <option>Brake pads with fittings</option>
                            <option>Brake cable replacement</option>
                            <option>Front wheel new inner tube replacement with fitting</option>
                            <option>Rear wheel new inner tube replacement with fitting</option>
                            <option>Front wheel new inner tube & standard tyre</option>
                            <option>Rear wheel new inner tube & standard tyre</option>
                            <option>Front wheel new solid tyre replacement</option>
                            <option>Rear wheel new solid tyre replacement</option>
                            <option>Throttle replacement</option>
                            <option>Rear mudguard with fitting</option>
                            <option>Rear mudguard with fitting including brake light and wiring</option>
                        </select>
                    </div>
                    <div className={styles.xiaomiBookingFormContainer}>
                        <input type="text"
                               className={styles.xiaomiBookingInput}
                               placeholder="Booking date"
                               onChange={(e) => setDate(e.target.value)}/>
                        <FontAwesomeIcon icon={faCalendar} className={styles.xiaomiIcon}/>
                    </div>
                    <div className={styles.xiaomiBookingFormContainer}>
                        <input type="text"
                               className={styles.xiaomiBookingInput}
                               placeholder="Full name"
                               onChange={(e) => setName(e.target.value)}/>
                        <FontAwesomeIcon icon={faSignature} className={styles.xiaomiIcon}/>
                    </div>
                    <div className={styles.xiaomiBookingFormContainer}>
                        <input type="email"
                               className={styles.xiaomiBookingInput}
                               placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <FontAwesomeIcon icon={faAt} className={styles.xiaomiIcon}/>
                    </div>
                    <div className={styles.xiaomiBookingFormContainer}>
                        <input type="number"
                               className={styles.xiaomiBookingInput}
                               placeholder="Phone number"
                               onChange={(e) => setPhone(e.target.value)}/>
                        <FontAwesomeIcon icon={faSignature} className={styles.xiaomiIcon}/>
                    </div>
                    <button disabled={btnDisable} className={styles.addBookingBtn} onClick={ submitFormHandler }>Add booking</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddXiaomiBooking;
