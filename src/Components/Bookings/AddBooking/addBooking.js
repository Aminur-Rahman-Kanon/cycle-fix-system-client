import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './addBooking.css';
import Calendar from "react-calendar";
import Modal from "../../Others/Modal/modal";
import Backdrop from "../../Others/Backdrop/backdrop";
import Spinners from "../../Others/Spinners/spinners";


const AddBooking = () => {

    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [issue, setIssue] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [deposit, setDeposit] = useState('');

    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState('');

    const submitFormHandler = (e) => {
        e.preventDefault();
        const firstName = name.split(' ')[0] || "Unspecified";
        const lastName = name.split(' ')[1] || "Unspecified";

        console.log(firstName, lastName);
        let due = null;
        if (totalPrice && deposit){
            due = parseInt(totalPrice) - parseInt(deposit)
        }

        const bikeDetails = {
            make, model, color, issue, additionalCost: 0
        }

        let packagePrice = 0;

        if (service === 'safety check'){
            packagePrice = 50;
        }
        else if(service === 'single speed full service'){
            packagePrice = 80;
        }
        else if(service === 'full service'){
            packagePrice = 80;
        }
        else if(service === 'brompton full service'){
            packagePrice = 80;
        }

        setSpinner(true);
        fetch('https://cycle-fix-system-server.onrender.com/add-booking', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service, authCode: 'N/A', packagePrice, totalPrice, deposit, bikeDetails, firstName, lastName, email, phone, date, due
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else if (data.status === 'booking exist'){
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else if (data.status === 'error'){
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            setSpinner(false);
            setStatus('network error');
            setModal(true);
            setBackdrop(true);
        })
    }

    const errorHandler = () => {
        setStatus('');
        setModal(false);
        setBackdrop(false);
    }

    let displayMsg = null;

    if (status === 'success'){
        displayMsg = <div className="display-msg-main">
            <h2>Booking added in the system</h2>
            <button className="display-msg-btn" onClick={() => window.location.href = '/booking'}>Ok</button>
        </div>
    }
    else if (status === 'booking exist'){
        displayMsg = <div className="display-msg-main">
            <h2>Booking exist with this email address</h2>
            <Link to={`/booking/${email}`} className="display-msg-btn">Check</Link>
        </div>
    }
    else if (status === 'error'){
        displayMsg = <div className="display-msg-main">
            <h2>Database didn't respond</h2>
            <p>Please try again or contact system developer</p>
            <button className="display-msg-btn" onClick={ errorHandler }>Ok</button>
        </div>
    }
    else {
        displayMsg = <div className="display-msg-main">
            <h2>Network error</h2>
            <p>Check internet connection</p>
            <button className="display-msg-btn" onClick={ errorHandler }>Ok</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={backdrop} />
        <Modal modal={modal}>
            {displayMsg}
        </Modal>
        <Spinners spinner={spinner}/>

        <div className="addBooking-main">
            <form className="form-container-main">
                <h2 style={{color: 'lightgray'}}>Booking information</h2>
                <div className="form-input-container">
                    <div className="form-input-groups">
                        <div className="form-input-service">
                            <label>Service</label>
                            <select className="select-service"
                                    defaultValue="Select a service"
                                    onChange={(e) => setService(e.target.value)}>
                                <option disabled>Select a service</option>
                                <option value="Safety check">Safety check</option>
                                <option value="Single speed full service">Single speed full service</option>
                                <option value="Full service">Full service</option>
                                <option value="Brompton full service">Brompton full service</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-input-group">
                            <h3 style={{color: 'lightgray', margin: '30px 0 0 60px'}}>Bike details</h3>
                            <div className="input-details-form">
                                <div className="input-details-input-container">
                                    <label  id="make">Make</label>
                                    <input name="make" 
                                           type="text"
                                           className="details-input"
                                           placeholder="Make"
                                           onChange={(e) => setMake(e.target.value)}/>
                                </div>
                                <div className="input-details-input-container">
                                    <label id="model">Model</label>
                                    <input name="model"
                                           type="text"
                                           className="details-input"
                                           placeholder="Model"
                                           onChange={(e) => setModel(e.target.value)}/>
                                </div>
                                <div className="input-details-input-container">
                                    <label id="color">color</label>
                                    <input name="color"
                                           type="text"
                                           className="details-input"
                                           placeholder="Color"
                                           onChange={(e) => setColor(e.target.value)}/>
                                </div>
                                <div className="input-details-input-container" style={{alignItems: 'flex-start'}}>
                                    <label id="additional-issue" style={{marginTop: '5px'}}>Issue</label>
                                    <textarea rows="5"
                                              className="details-textarea"
                                              placeholder="Issue/Problem"
                                              onChange={(e) => setIssue(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-input-group">
                            <h3 style={{color: 'lightgray', margin: '30px 0 0 60px'}}>User information</h3>
                            <div className="input-details-form">
                                <div className="input-details-input-container">
                                    <label id="name">Name</label>
                                    <input name="name"
                                           type="text"
                                           className="details-input"
                                           placeholder="Name"
                                           onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="input-details-input-container">
                                    <label id="email">Email</label>
                                    <input name="email"
                                           type="email"
                                           className="details-input"
                                           placeholder="Email"
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="input-details-input-container">
                                    <label id="phone">Phone</label>
                                    <input name="phome"
                                           type="number"
                                           className="details-input"
                                           placeholder="Phone"
                                           onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-input-groups">
                        <h3 style={{color: 'lightgray', margin: '10px'}}>Select a date</h3>
                        <div className="form-input-group">
                            <Calendar minDate={new Date()}
                                      value={new Date(date ||null)}
                                      onClickDay={(value) => console.log(value)}
                                      showNeighboringMonth={false}
                                      tileDisabled={({date}) => date.getDay() === 0}
                                      tileClassName={({ date }) => date.getDay() === 0 && date.getDate().toString() !== new Date().getDate().toString() ? "calender-weekend" : null}
                                      onChange={(value) => setDate(value.toDateString())}
                                      />
                        </div>
                        <div className="form-input-group" style={{marginTop: '100px'}}>
                            <div className="input-details-input-container" style={{width: '400px'}}>
                                <label id="phone" style={{width: '150px'}}>Total amount</label>
                                <input type="number"
                                        className="details-input"
                                        placeholder="Total amount"
                                        onChange={(e) => setTotalPrice(e.target.value)}/>
                            </div>
                            <div className="input-details-input-container" style={{width: '400px'}}>
                                <label id="phone" style={{width: '150px'}}>Deposit</label>
                                <input type="number"
                                        className="details-input"
                                        placeholder="Deposit"
                                        onChange={(e) => setDeposit(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="booking-btn" onClick={ submitFormHandler }>Add booking</button>
            </form>
        </div>
        </>
    )
}

export default AddBooking;
