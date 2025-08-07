import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import './index.css'
// import Footer from '../components/Footer';
import Forgot from '../pages/Forgot';
import Dashboard from '../pages/Dashboard';
import ResetPassword from '../pages/ResetPassword';

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
        <Route path = "/forgot" element = {<Forgot />} />
        <Route path = "/reset" element = {<ResetPassword />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;