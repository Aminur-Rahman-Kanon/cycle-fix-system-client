import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemMain from './Components/SystemMain/systemMain';
import NoMatchRoute from './Components/NoMatchRoute/NoMathcRoute';
import Topbar from './Components/Topbar/topbar';
import Bookings from './Components/Bookings/bookings';
import AddBooking from './Components/Bookings/AddBooking/addBooking';
import Spinners from './Components/Others/Spinners/spinners';
import SystemStatus from './Components/Others/SystemStatus/systemStatus';
import './App.css';

export const DataContainer = createContext(null);

function App() {

  const [bookings, setBookings] = useState([]);
  
  const [contactQuery, setContactQuery] = useState([]);

  const [spinner, setSpinner] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    setSpinner(true);
    fetch('https://cycle-fix-system-server.onrender.com/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      setSpinner(false);
      setBookings(data.data)
    }).catch(err => {
      setSpinner(false);
      setError(true);
    });
  }, [])

  return (
    <div className="App">
      <Spinners spinner={spinner} />
      <SystemStatus error={error} />
      <Topbar />
      <DataContainer.Provider value={{bookings, contactQuery}}>
        <Routes>
          <Route path='/' element={<SystemMain />}/>
          <Route path='*' element={<NoMatchRoute />}/>
          <Route path='/booking' element={<Bookings />}/>
          <Route path='/booking/:email' element={<Bookings />}/>
          <Route path='/add-booking' element={<AddBooking />}/>
        </Routes>
      </DataContainer.Provider>
    </div>
  );
}

export default App;
