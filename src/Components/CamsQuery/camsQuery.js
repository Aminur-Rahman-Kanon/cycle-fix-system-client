import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContainer } from "../../App";
import PaginationSystem from "../Others/PaginationSystem/paginationSystem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../Others/SearchBar/searchBar";
import styles from './camsQuery.module.css';
import { Link } from "react-router-dom";

const CamsQuery = () => {

    const searchInputRef = useRef(null);

    const data = useContext(DataContainer).cams;

    const [sliceIndex, setSliceIndex] = useState(0);

    const [searchCustomer, setSearchCustomer] = useState('');

    const totalpage = data ? Math.ceil(data.length/3) : 0;

    useEffect(() => {
        return () => clearTimeout(searchInputRef.current);
    }, [searchCustomer])

    let searchCustomerDisplay = <div className={styles.searchCustomerDisplayMain}>
        <h1>Nothing found</h1>
    </div>;

    if (searchCustomer){
        if (data){
            const searchCustomerfliter = data.filter(item => item.email === searchCustomer);
            if (searchCustomerfliter.length > 0){
                searchCustomerDisplay = searchCustomerfliter.map(item => <div key={item._id} className={styles.camsQueryItems}>
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
                        <p className={styles.CamsQueryP}>{item.phoneNumber}</p>
                    </div>
                    <div className={styles.CamsQueryItem}>
                        <h4 className={styles.CamsQueryH4}>Message:</h4>
                        <p className={styles.CamsQueryP}>{item.message}</p>
                    </div>
                </div>)
            }
        }
    }

    let display = <div className={styles.noBookingFound}>
        <h1>No booking found</h1>
        <Link to="/add-cams-booking" className={styles.addBookingLink}>Add booking</Link>
    </div>

    if (data){
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
                <h4 className={styles.CamsQueryH4}>Phone:</h4>
                <p className={styles.CamsQueryP}>{item.phoneNumber}</p>
            </div>
            <div className={styles.CamsQueryItem}>
                <h4 className={styles.CamsQueryH4}>Message:</h4>
                <p className={styles.CamsQueryP}>{item.message}</p>
            </div>
        </div>)
    }

    const searchCustomerHandler = (e) => {
        searchInputRef.current = setTimeout(() => {
            setSearchCustomer(e.target.value);
        }, 1200)
    }

    return (
        <div className={styles.camsQueryMain}>
            <Link to="/add-cams-booking" className={styles.addBookingBtnContainer}>
                <FontAwesomeIcon icon={faPlus} className={styles.addIcon}/>
                <button className={styles.addBtn}>Add booking</button>
            </Link>
            <h1 style={{color: '#7db2ed', letterSpacing: '1px'}}>Cams Query</h1>
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

export default CamsQuery;
