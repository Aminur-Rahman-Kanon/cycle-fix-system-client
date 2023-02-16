import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemMain from './Components/SystemMain/systemMain';
import NoMatchRoute from './Components/NoMatchRoute/NoMathcRoute';
import Topbar from './Components/Topbar/topbar';
import Bookings from './Components/Bookings/bookings';
import AddBooking from './Components/Bookings/AddBooking/addBooking';
import Spinners from './Components/Others/Spinners/spinners';
import SystemStatus from './Components/Others/SystemStatus/systemStatus';
import CamsQuery from './Components/CamsQuery/camsQuery';
import AddCamsBooking from './Components/CamsQuery/AddCamsBooking/addCamsBooking';
import Xiaomi from './Components/Xiaomi/xiaomi';
import AddXiaomiBooking from './Components/Xiaomi/addXiaomiBooking/addXiaomiBooking';
import Contact from './Components/Contact/contact';
import Feedback from './Components/Feedback/feedback';
import RegisteredUser from './Components/RegisteredUser/registeredUser';
import './App.css';

export const DataContainer = createContext(null);

function App() {

  const [bookings, setBookings] = useState({});

  const [cams, setCams] = useState([]);

  const [xiaomi, setXiaomi] = useState([]);

  const [camsCount, setCamsCount] = useState(0);

  const [bookingCount, setBookingCount] = useState(0);

  const [todayCount, setTodayCount] = useState(0);

  const [xiaomiCount, setXiaomiCount] = useState(0);
  
  const [contact, setContact] = useState([]);

  const [contactCount, setContactCount] = useState(0);

  const [feedback, setFeedback] = useState([]);

  const [feedbackCount, setFeedbackCount] = useState(0);

  const [registeredUser, setRegisteredUser] = useState([]);

  const [registeredUserCount, setRegisteredUserCount] = useState(0);

  const [spinner, setSpinner] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    setSpinner(true);
    
    Promise.all([
      fetch('https://cycle-fix-system-server.onrender.com/bookings'),
      fetch('https://cycle-fix-system-server.onrender.com/cams-query'),
      fetch('https://cycle-fix-system-server.onrender.com/xiaomi-query'),
      fetch('https://cycle-fix-system-server.onrender.com/contact-query'),
      fetch('https://cycle-fix-system-server.onrender.com/feedback'),
      fetch('https://cycle-fix-system-server.onrender.com/registered-user')
    ]).then(([bookingsRes, camRes, xiaomiRes, contactRes, feedbackRes, registeredUserRes]) => Promise.all([bookingsRes.json(), camRes.json(), xiaomiRes.json(), contactRes.json(), feedbackRes.json(), registeredUserRes.json()])).
    then(([bookingData, camsData, xiaomiData, contactData, feedbackData, registeredUserData]) => {
      setSpinner(false);
      setBookings(bookingData.data);
      setCams(camsData.data);
      setCamsCount(camsData.data.length)
      setXiaomi(xiaomiData.data);
      setXiaomiCount(xiaomiData.data.length);
      setContact(contactData.data);
      setContactCount(contactData.data.length);
      setFeedback(feedbackData.data);
      setBookingCount(feedbackData.data.length);
      setRegisteredUser(registeredUserData.data);
      setRegisteredUserCount(registeredUserData.data.length);
    })
  }, [])

  useEffect(() => {
    let count = 0;
    let todayCount = 0;
    const today = new Date().toDateString();
    if (Object.keys(bookings).length > 0){
      Object.values(bookings).map(item => Object.values(item).map(nesItem => {
        count ++;
        if (today === nesItem.date){
          todayCount ++;
        };
      }));
      setBookingCount(count);
      setTodayCount(todayCount);
    }
  }, [bookings])


  return (
    <div className="App">
      <Spinners spinner={spinner} />
      <SystemStatus error={error} />
      <Topbar />
      <DataContainer.Provider value={{bookings, contact, contactCount, bookingCount, todayCount, cams, camsCount, xiaomi, xiaomiCount, feedback, feedbackCount, registeredUser, registeredUserCount}}>
        <Routes>
          <Route path='/' element={<SystemMain />}/>
          <Route path='/booking' element={<Bookings />}/>
          <Route path='/booking/:email' element={<Bookings />}/>
          <Route path='/add-booking' element={<AddBooking />}/>
          <Route path='/cams-query' element={<CamsQuery />}/>
          <Route path='/add-cams-booking' element={<AddCamsBooking />}/>
          <Route path='/xiaomi' element={<Xiaomi />}/>
          <Route path='/add-xiaomi-booking' element={<AddXiaomiBooking />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='/registered-user' element={<RegisteredUser />}/>
          <Route path='*' element={<NoMatchRoute />}/>
        </Routes>
      </DataContainer.Provider>
    </div>
  );
}

export default App;
