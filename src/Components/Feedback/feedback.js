import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContainer } from "../../App";
import styles from '../CamsQuery/camsQuery.module.css';
import Modal from "../Others/Modal/modal";
import Backdrop from "../Others/Backdrop/backdrop";
import SearchBar from "../Others/SearchBar/searchBar";
import PaginationSystem from "../Others/PaginationSystem/paginationSystem";

const Feedback = () => {

    const timeeRef = useRef(null);

    const data = useContext(DataContainer).feedback;

    const totalpage = data ? data.length / 3 : 0;

    const [sliceIndex, setSliceIndex] = useState(0);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [status, setStatus] = useState('');

    const [searchCustomer, setSearchCustomer] = useState('');

    useEffect(() => {
        return () => clearTimeout(timeeRef.current);
    }, [searchCustomer])

    const deleteHandler = (email) => {
        console.log(email);
        fetch('https://cycle-fix-system-server.onrender.com/delete-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else if (data.status === 'not found'){
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setStatus('error');
            setModal(true);
            setBackdrop(true);
        })
    }

    const searchCustomerHandler = (e) => {
        timeeRef.current = setTimeout(() => {
            setSearchCustomer(e.target.value);
        }, 1200)
    }

    let display = <div className={styles.noBookingFound}>
        <h1>No Feedback found</h1>
    </div>

    if (data.length > 0){
        display = data.slice(sliceIndex * 3, (sliceIndex * 3) + 3).map(item => <div key={item._id} className={styles.camsQueryItems}>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Name:</h4>
                <p className={styles.CamsQueryP}>{item.name}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Email:</h4>
                <p className={styles.CamsQueryP}>{item.email}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Rating:</h4>
                <p className={styles.CamsQueryP}>{item.rating}</p>
            </div>
            <div className={styles.CamsQueryItem} style={{minHeight: '90px'}}>
                <h4 className={styles.CamsQueryH4}>Comment:</h4>
                <p className={styles.CamsQueryP}>{item.comment}</p>
            </div>

            <button className={styles.deleteBtn} onClick={ () => deleteHandler(item.email) }>Delete</button>
        </div>)
    }

    let searchCustomerDisplay = <div className={styles.searchCustomerDisplayMain}>
        <h1>Nothing found</h1>
    </div>

    if (searchCustomer){
        const searchFilter = data.filter(item => item.email === searchCustomer);
        console.log(searchFilter);
        if (searchFilter.length > 0) {
            searchCustomerDisplay = searchFilter.map(items => <div key={items._id} className={styles.camsQueryItems}>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Name:</h4>
                    <p className={styles.CamsQueryP}>{items.name}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Email:</h4>
                    <p className={styles.CamsQueryP}>{items.email}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Rating:</h4>
                    <p className={styles.CamsQueryP}>{items.rating}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Comment:</h4>
                    <p className={styles.CamsQueryP}>{items.comment}</p>
                </div>
                <button className={styles.deleteBtn} onClick={ () => deleteHandler(items.email) }>Delete</button>
            </div>)
        }
    }

    let statusMsg = null;

    if (status === 'success'){
        statusMsg = <div className={styles.statusMsgMain}>
            <h2>Feedback deleted</h2>
            <p>System updated</p>
            <button className={styles.statusMsgBtn} onClick={() => window.location.href="/"}>Ok</button>
        </div>
    }
    else {
        statusMsg = <div className={styles.statusMsgMain}>
            <h2>Something went wrong</h2>
            <p>Please try again</p>
            <button className={styles.statusMsgBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setBackdrop(false);
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={backdrop}/>
        <Modal modal={modal}>
            {statusMsg}
        </Modal>
        <div className={styles.camsQueryMain}>
            <h1 style={{color: '#7db2ed', letterSpacing: '1px'}}>Feedback</h1>
            <SearchBar placeholder="Search customer" searchBarHandler={searchCustomerHandler}/>
            <PaginationSystem increment={() => setSliceIndex(sliceIndex + 1)}
                              decrement={() => setSliceIndex(sliceIndex - 1)}
                              incrementDisable={sliceIndex >= totalpage}
                              decrementDisable={sliceIndex <= 0}
                              />
            <div className={styles.camsQueryContainer}>
                {searchCustomer ? searchCustomerDisplay : display}
            </div>
        </div>
        </>
    )
}

export default Feedback;
