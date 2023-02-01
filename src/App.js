import { Routes, Route } from 'react-router-dom';
import SystemMain from './Components/SystemMain/systemMain';
import NoMatchRoute from './Components/NoMatchRoute/NoMathcRoute';
import Topbar from './Components/Topbar/topbar';
import Bookings from './Components/Bookings/bookings';
import './App.css';


function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path='/' element={<SystemMain />}/>
        <Route path='*' element={<NoMatchRoute />}/>
        <Route path='/booking' element={<Bookings />}/>
      </Routes>
    </div>
  );
}

export default App;
