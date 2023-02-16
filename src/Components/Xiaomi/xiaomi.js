import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContainer } from "../../App";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../Others/SearchBar/searchBar";
import PaginationSystem from "../Others/PaginationSystem/paginationSystem";
import styles from '../CamsQuery/camsQuery.module.css';

const Xiaomi = () => {

    const timeeRef = useRef(null);

    const data = useContext(DataContainer).xiaomi;

    const [sliceIndex, setSliceIndex] = useState(0);

    const [searchCustomer, setSearchCustomer] = useState('');

    const totalpage = data ? data.length / 3 : 0

    useEffect(() => {
        return () => clearTimeout(timeeRef.current);
    }, [searchCustomer])

    let display = <div className={styles.noBookingFound}>
        <h1>No booking found</h1>
        <Link to="/add-xiaomi-booking" className={styles.addBookingLink}>Add booking</Link>
    </div>

    if (data){
        display = data.slice(sliceIndex * 3, (sliceIndex * 3) + 3).map(item => <div key={item._id} className={styles.camsQueryItems}>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Date:</h4>
                <p className={styles.CamsQueryP}>{item.date}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Service:</h4>
                <p className={styles.CamsQueryP}>{item.service}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Name:</h4>
                <p className={styles.CamsQueryP}>{item.name}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Email:</h4>
                <p className={styles.CamsQueryP}>{item.email}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Phone:</h4>
                <p className={styles.CamsQueryP}>{item.phone}</p>
            </div>
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
                    <h4 className={styles.CamsQueryH4}>Date:</h4>
                    <p className={styles.CamsQueryP}>{items.date}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Service:</h4>
                    <p className={styles.CamsQueryP}>{items.service}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Name:</h4>
                    <p className={styles.CamsQueryP}>{items.name}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Email:</h4>
                    <p className={styles.CamsQueryP}>{items.email}</p>
                </div>
                <div className={styles.CamsQueryItem}>
                    <h4 className={styles.CamsQueryH4}>Phone:</h4>
                    <p className={styles.CamsQueryP}>{items.phone}</p>
                </div>
            </div>)
        }
    }

    const searchCustomerHandler = (e) => {
        timeeRef.current = setTimeout(() => {
            setSearchCustomer(e.target.value);
        }, 1200)
    }

    return (
        <div className={styles.camsQueryMain}>
            <Link to="/add-xiaomi-booking" className={styles.addBookingBtnContainer}>
                <FontAwesomeIcon icon={faPlus} className={styles.addIcon}/>
                <button className={styles.addBtn}>Add booking</button>
            </Link>
            <h1 style={{color: '#7db2ed', letterSpacing: '1px'}}>Xiaomi Query</h1>
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
    )
}

export default Xiaomi;
